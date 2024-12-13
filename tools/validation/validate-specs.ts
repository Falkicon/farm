/**
 * YAML Specification Validator
 * Validates YAML specification files against a predefined schema using Ajv.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Ajv, { ErrorObject } from 'ajv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Priority levels for specifications */
type Priority = 'High' | 'Medium' | 'Low';

/** Represents a specification document with required fields and additional properties */
interface SpecificationDocument {
  '@module': string;
  '@version': string;
  '@priority': Priority;
  overview: string;
  [key: string]: unknown;
}

// Initialize Ajv
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
  allowUnionTypes: true,
  messages: true
});

/** JSON Schema for validating specification documents */
const specificationSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['@module', '@version', '@priority', 'overview'],
  properties: {
    '@module': {
      type: 'string',
      minLength: 1,
      description: 'Module name'
    },
    '@version': {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+$',
      description: 'Semantic version (e.g., 1.0.0)'
    },
    '@priority': {
      type: 'string',
      enum: ['High', 'Medium', 'Low'],
      description: 'Priority level of the specification'
    },
    'overview': {
      type: 'string',
      minLength: 1,
      description: 'Overview description of the specification'
    }
  },
  additionalProperties: true
};

const validate = ajv.compile(specificationSchema);

/** Result of a specification validation */
interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

/**
 * Formats Ajv errors into human-readable messages
 */
function formatErrors(errors: ErrorObject[]): string[] {
  return errors.map(error => {
    const path = error.instancePath.replace(/^\//, '') || 'root';
    const value = JSON.stringify(error.data);

    switch (error.keyword) {
      case 'required':
        return `Missing required field: ${error.params.missingProperty}`;
      case 'enum':
        return `Invalid value for ${path}: ${value}. Must be one of: ${error.params.allowedValues.join(', ')}`;
      case 'pattern':
        return `Invalid format for ${path}: ${value}. Must match pattern: ${error.params.pattern}`;
      case 'minLength':
        return `Field ${path} cannot be empty`;
      case 'type':
        return `Invalid type for ${path}: expected ${error.params.type}, got ${typeof error.data}`;
      default:
        return `${path}: ${error.message}`;
    }
  });
}

/**
 * Preprocesses YAML content to handle @ prefixed fields
 */
function preprocessYaml(content: string): string {
  // Add --- at the start if not present
  if (!content.startsWith('---\n')) {
    content = '---\n' + content;
  }

  // Replace @ prefixed fields with quoted versions
  return content.replace(/^@(\w+):/gm, '"@$1":');
}

/**
 * Validates a YAML specification file against the schema
 * @param filePath - Path to the YAML file to validate
 * @returns Validation result with any errors found
 */
function validateSpec(filePath: string): ValidationResult {
  try {
    process.stdout.write('Reading file...\n');
    const content = readFileSync(filePath, 'utf-8');

    process.stdout.write('Parsing YAML...\n');
    const processedContent = preprocessYaml(content);
    const spec = load(processedContent) as SpecificationDocument;

    process.stdout.write('Validating against schema...\n');
    const valid = validate(spec);

    if (!valid) {
      return {
        valid: false,
        errors: formatErrors(validate.errors || [])
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      errors: [(error as Error).message]
    };
  }
}

/**
 * Gets all YAML files in a directory recursively
 */
function getYamlFiles(dir: string): string[] {
  const files: string[] = [];

  function scan(directory: string) {
    const entries = readdirSync(directory);
    for (const entry of entries) {
      const fullPath = join(directory, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (stat.isFile() && /\.ya?ml$/i.test(entry)) {
        files.push(fullPath);
      }
    }
  }

  scan(dir);
  return files;
}

/**
 * Main entry point for the validation script
 */
function main(): void {
  let files: string[];
  const specsDir = join(process.cwd(), 'docs/specs');

  // If a specific file is provided, validate only that file
  if (process.argv[2]) {
    files = [process.argv[2]];
  } else {
    // Otherwise, validate all YAML files in the specs directory
    files = getYamlFiles(specsDir);
  }

  if (files.length === 0) {
    process.stdout.write('No YAML files found to validate.\n');
    process.exit(1);
  }

  let hasErrors = false;
  const results: string[] = ['\n=== Validation Results ===\n'];

  for (const file of files) {
    process.stdout.write(`\nValidating file: ${file}\n`);
    const result = validateSpec(file);

    results.push(`\nFile: ${file}`);
    results.push(result.valid ? '✓ Validation passed' : '✗ Validation failed');

    if (!result.valid && result.errors) {
      results.push('Errors found:');
      result.errors.forEach((error, index) => {
        results.push(`${index + 1}. ${error}`);
      });
      hasErrors = true;
    }
  }

  // Write results to stdout
  results.forEach(line => process.stdout.write(line + '\n'));

  // Exit with appropriate code
  const exitCode = hasErrors ? 1 : 0;
  process.stdout.write(`\n${exitCode} (${exitCode === 0 ? 'PASS' : 'FAIL'})\n`);
  process.exit(exitCode);
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateSpec, specificationSchema, type SpecificationDocument, type Priority };

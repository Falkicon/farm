/**
 * YAML Specification Validator
 * Validates YAML specification files against a predefined schema using Ajv.
 */

import { readFileSync } from 'fs';
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
 * Validates a YAML specification file against the schema
 * @param filePath - Path to the YAML file to validate
 * @returns Validation result with any errors found
 */
function validateSpec(filePath: string): ValidationResult {
  try {
    process.stdout.write('Reading file...\n');
    const content = readFileSync(filePath, 'utf-8');

    process.stdout.write('Parsing YAML...\n');
    const spec = load(content);
    process.stdout.write('Parsed spec: ' + JSON.stringify(spec, null, 2) + '\n');

    process.stdout.write('Validating against schema...\n');
    const valid = validate(spec);
    process.stdout.write('Validation result: ' + valid + '\n');

    if (!valid) {
      process.stdout.write('Validation errors: ' + JSON.stringify(validate.errors, null, 2) + '\n');
      return {
        valid: false,
        errors: formatErrors(validate.errors || [])
      };
    }

    return { valid: true };
  } catch (error) {
    process.stdout.write('Error: ' + (error as Error).message + '\n');
    return {
      valid: false,
      errors: [(error as Error).message]
    };
  }
}

/**
 * Main entry point for the validation script
 */
function main(): void {
  const specPath = process.argv[2] || join(process.cwd(), 'docs/specs/test-spec.yaml');
  process.stdout.write('Validating file: ' + specPath + '\n');

  const result = validateSpec(specPath);

  const output = [
    '\n=== Validation Results ===\n',
    'File: ' + specPath + '\n',
    result.valid ? '✓ Validation passed\n' : '✗ Validation failed\n'
  ];

  if (!result.valid && result.errors) {
    output.push('Errors found:');
    result.errors.forEach((error, index) => {
      output.push(`${index + 1}. ${error}`);
    });
    output.push('');
  }

  // Write results to stdout
  output.forEach(line => process.stdout.write(line + '\n'));

  // Write exit code in a specific format
  const exitCode = result.valid ? 0 : 1;
  process.stdout.write(`\n${exitCode} (${exitCode === 0 ? 'PASS' : 'FAIL'})\n`);

  // Exit with appropriate code
  process.exit(exitCode);
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateSpec, specificationSchema, type SpecificationDocument, type Priority };

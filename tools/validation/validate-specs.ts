/**
 * YAML Specification Validator
 * Validates YAML specification files against a predefined schema using Ajv.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { load } from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { ErrorObject } from 'ajv';
import Ajv from 'ajv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Priority levels for specifications */
type Priority = 'High' | 'Medium' | 'Low';

/** Specification types */
type SpecType = 'module' | 'feature' | 'project' | 'openapi';

/** Base specification document interface */
export interface BaseSpecification {
  '@priority': Priority;
  overview: string;
  [key: string]: unknown;
}

/** Module specification document */
export interface ModuleSpecification extends BaseSpecification {
  '@module': string;
  '@version': string;
}

/** Feature specification document */
export interface FeatureSpecification extends BaseSpecification {
  '@feature': string;
  '@module': string;
  '@version': string;
}

/** Project specification document */
export interface ProjectSpecification extends BaseSpecification {
  '@project': string;
  '@version': string;
}

/** OpenAPI specification document */
export interface OpenAPISpecification {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  [key: string]: unknown;
}

/** Result of a specification validation */
interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

/** Base schema for all specifications */
const baseSchema = {
  type: 'object',
  required: ['@priority', 'overview'],
  properties: {
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
  }
} as const;

/** Schema for module specifications */
const moduleSchema = {
  ...baseSchema,
  required: [...baseSchema.required, '@module', '@version'],
  properties: {
    ...baseSchema.properties,
    '@module': {
      type: 'string',
      minLength: 1,
      description: 'Module name'
    },
    '@version': {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+$',
      description: 'Semantic version (e.g., 1.0.0)'
    }
  },
  additionalProperties: true
} as const;

/** Schema for feature specifications */
const featureSchema = {
  ...moduleSchema,
  required: [...moduleSchema.required, '@feature'],
  properties: {
    ...moduleSchema.properties,
    '@feature': {
      type: 'string',
      minLength: 1,
      description: 'Feature name'
    }
  }
} as const;

/** Schema for project specifications */
const projectSchema = {
  ...baseSchema,
  required: [...baseSchema.required, '@project', '@version'],
  properties: {
    ...baseSchema.properties,
    '@project': {
      type: 'string',
      minLength: 1,
      description: 'Project name'
    },
    '@version': {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+$',
      description: 'Semantic version (e.g., 1.0.0)'
    }
  }
} as const;

/** Schema for OpenAPI specifications */
const openApiSchema = {
  type: 'object',
  required: ['openapi', 'info'],
  properties: {
    openapi: {
      type: 'string',
      pattern: '^3\\.\\d+\\.\\d+$'
    },
    info: {
      type: 'object',
      required: ['title', 'version', 'description'],
      properties: {
        title: { type: 'string', minLength: 1 },
        version: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 1 }
      }
    }
  }
} as const;

// Initialize Ajv with strict mode and all errors
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: true,
  allowUnionTypes: true,
  messages: true
});

// Compile validators
const validateModule = ajv.compile(moduleSchema);
const validateFeature = ajv.compile(featureSchema);
const validateProject = ajv.compile(projectSchema);
const validateOpenApi = ajv.compile(openApiSchema);

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
 * Determines if a file should be validated
 */
function shouldValidateFile(filePath: string): boolean {
  const filename = basename(filePath).toLowerCase();
  // Skip specific files that don't follow our spec format
  const excludedFiles = ['openapi.yaml'];
  if (excludedFiles.includes(filename)) {
    return false;
  }
  return filename.endsWith('-spec.yaml') || filename.endsWith('-spec.yml');
}

/**
 * Determines the type of specification from the file path and content
 */
function getSpecType(filePath: string, content: Record<string, unknown>): SpecType {
  if (filePath.includes('openapi.yaml') || 'openapi' in content) {
    return 'openapi';
  }
  if ('@feature' in content) {
    return 'feature';
  }
  if ('@project' in content) {
    return 'project';
  }
  return 'module';
}

/**
 * Validates a YAML specification file against the appropriate schema
 */
function validateSpec(filePath: string): ValidationResult {
  try {
    if (!shouldValidateFile(filePath)) {
      return { valid: true };
    }

    const content = readFileSync(filePath, 'utf-8');
    const processedContent = preprocessYaml(content);
    const spec = load(processedContent) as Record<string, unknown>;
    const specType = getSpecType(filePath, spec);

    switch (specType) {
      case 'feature':
        return validateFeature(spec)
          ? { valid: true }
          : { valid: false, errors: formatErrors(validateFeature.errors || []) };
      case 'project':
        return validateProject(spec)
          ? { valid: true }
          : { valid: false, errors: formatErrors(validateProject.errors || []) };
      case 'openapi':
        return validateOpenApi(spec)
          ? { valid: true }
          : { valid: false, errors: formatErrors(validateOpenApi.errors || []) };
      default:
        return validateModule(spec)
          ? { valid: true }
          : { valid: false, errors: formatErrors(validateModule.errors || []) };
    }
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

  function scan(directory: string): void {
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
  const specsDir = join(process.cwd(), 'docs/specs');
  const files = process.argv[2] ? [process.argv[2]] : getYamlFiles(specsDir);

  if (files.length === 0) {
    process.stdout.write('No YAML files found to validate.\n');
    process.exit(1);
  }

  let hasErrors = false;
  const results: string[] = ['\n=== Validation Results ===\n'];

  for (const file of files) {
    if (!shouldValidateFile(file)) {
      process.stdout.write(`\nSkipping non-spec file: ${file}\n`);
      continue;
    }

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

  results.forEach(line => process.stdout.write(`${line}\n`));
  const exitCode = hasErrors ? 1 : 0;
  process.stdout.write(`\n${exitCode} (${exitCode === 0 ? 'PASS' : 'FAIL'})\n`);
  process.exit(exitCode);
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateSpec, moduleSchema, featureSchema, projectSchema };

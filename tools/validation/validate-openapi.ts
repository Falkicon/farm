import SwaggerParser from '@apidevtools/swagger-parser';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

async function validateOpenAPI(filePath: string): Promise<ValidationResult> {
  try {
    const fileContent = await readFile(filePath, 'utf-8');
    const openApiDoc = load(fileContent);

    // Use SwaggerParser for validation
    try {
      await SwaggerParser.validate(openApiDoc);
      return { valid: true };
    } catch (validationError) {
      return {
        valid: false,
        errors: [(validationError as Error).message]
      };
    }
  } catch (error) {
    return {
      valid: false,
      errors: [(error as Error).message]
    };
  }
}

async function main() {
  try {
    // Test the OpenAPI file
    const specPath = join(process.cwd(), 'docs/specs/openapi.yaml');
    const result = await validateOpenAPI(specPath);

    if (!result.valid) {
      console.error('OpenAPI validation failed:');
      result.errors?.forEach(error => console.error(`- ${error}`));
      process.exit(1);
    }

    console.log('OpenAPI validation successful');
  } catch (error) {
    console.error('Validation failed:', (error as Error).message);
    process.exit(1);
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateOpenAPI };

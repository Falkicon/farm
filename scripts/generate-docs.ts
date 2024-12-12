import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs/promises';

interface ComponentDoc {
    name: string;
    description: string;
    properties: PropertyDoc[];
    events: EventDoc[];
    examples: string[];
}

interface PropertyDoc {
    name: string;
    type: string;
    description: string;
    default?: string;
}

interface EventDoc {
    name: string;
    detail: string;
    description: string;
}

async function generateComponentDocs() {
    const componentsDir = path.join(__dirname, '../src/frontend/shared/components');
    const files = await fs.readdir(componentsDir);
    const docs: ComponentDoc[] = [];

    for (const file of files) {
        if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
            const _sourceFile = ts.createSourceFile(
                file,
                await fs.readFile(path.join(componentsDir, file), 'utf8'),
                ts.ScriptTarget.Latest,
                true
            );

            const componentDoc = parseComponentFile(_sourceFile);
            if (componentDoc) {
                docs.push(componentDoc);
                await generateMarkdown(componentDoc);
            }
        }
    }

    await generateIndexDoc(docs);
}

function parseComponentFile(sourceFile: ts.SourceFile): ComponentDoc | null {
    // Implementation of TypeScript AST parsing
    // Extract class decorators, properties, methods, and JSDoc comments
    const classNodes = sourceFile.statements.filter(ts.isClassDeclaration);
    if (classNodes.length === 0) return null;

    const classNode = classNodes[0];
    const className = classNode.name?.text || 'UnnamedComponent';

    return {
        name: className,
        description: getClassDescription(classNode),
        properties: getClassProperties(classNode),
        events: getClassEvents(classNode),
        examples: getClassExamples(classNode)
    };
}

function getClassDescription(_node: ts.ClassDeclaration): string {
    // Extract JSDoc comment
    return '';
}

function getClassProperties(_node: ts.ClassDeclaration): PropertyDoc[] {
    return [];
}

function getClassEvents(_node: ts.ClassDeclaration): EventDoc[] {
    return [];
}

function getClassExamples(_node: ts.ClassDeclaration): string[] {
    return [];
}

async function generateMarkdown(doc: ComponentDoc): Promise<void> {
    const markdown = `
# ${doc.name}

${doc.description}

## Properties

${doc.properties.map(prop => `
### ${prop.name}
- Type: \`${prop.type}\`
- Default: ${prop.default || 'none'}
${prop.description}
`).join('\n')}

## Events

${doc.events.map(event => `
### ${event.name}
- Detail: \`${event.detail}\`
${event.description}
`).join('\n')}

## Examples

${doc.examples.join('\n\n')}
`;

    await fs.writeFile(
        path.join(__dirname, '../docs/components', `${doc.name}.md`),
        markdown
    );
}

async function generateIndexDoc(docs: ComponentDoc[]): Promise<void> {
    const markdown = `# Component Documentation

## Available Components

${docs.map(doc => `- [${doc.name}](./${doc.name}.md)`).join('\n')}
`;

    await fs.writeFile(
        path.join(__dirname, '../docs/components/README.md'),
        markdown
    );
}

generateComponentDocs().catch(console.error);

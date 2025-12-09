#!/usr/bin/env ts-node
/**
 * Validation script to check if types.ts and data-model.md are in sync
 * 
 * This script does a basic structural check to ensure the data model spec
 * and implementation haven't drifted. It's not a full type validator, but
 * catches obvious mismatches.
 * 
 * Usage: npx ts-node scripts/validate-type-sync.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TYPES_FILE = path.join(__dirname, '../src/domain/types.ts');
const DATA_MODEL_FILE = path.join(__dirname, '../docs/data-model.md');

interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
}


// Extract type/interface definitions and their fields from TypeScript code
function extractTypeDefinitions(content: string): Record<string, Record<string, string>> {
  const typeDefs: Record<string, Record<string, string>> = {};
  // Match export interface/type blocks
  const blockRegex = /export (interface|type) (\w+)\s*([^{=]*){([\s\S]*?)};?/g;
  let match;
  while ((match = blockRegex.exec(content)) !== null) {
    const [, kind, name, , body] = match;
    typeDefs[name] = {};
    // Match fields: fieldName: type;
    const fieldRegex = /(\w+)\s*:\s*([^;\n]+);/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      const [, fieldName, fieldType] = fieldMatch;
      typeDefs[name][fieldName] = fieldType.trim();
    }
  }
  return typeDefs;
}

// Extract type/interface definitions and their fields from markdown code blocks
function extractDataModelDefinitions(content: string): Record<string, Record<string, string>> {
  const typeDefs: Record<string, Record<string, string>> = {};
  // Only look in TypeScript code blocks
  const codeBlockRegex = /```typescript?\n?([\s\S]*?)```/g;
  let codeMatch;
  while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
    const codeBlock = codeMatch[1];
    // Match export interface/type blocks
    const blockRegex = /export (interface|type) (\w+)\s*([^{=]*){([\s\S]*?)};?/g;
    let match;
    while ((match = blockRegex.exec(codeBlock)) !== null) {
      const [, kind, name, , body] = match;
      typeDefs[name] = {};
      // Match fields: fieldName: type;
      const fieldRegex = /(\w+)\s*:\s*([^;\n]+);/g;
      let fieldMatch;
      while ((fieldMatch = fieldRegex.exec(body)) !== null) {
        const [, fieldName, fieldType] = fieldMatch;
        typeDefs[name][fieldName] = fieldType.trim();
      }
    }
  }
  return typeDefs;
}

function extractVersion(content: string, isMarkdown: boolean): string | null {
  if (isMarkdown) {
    // Look for **Version:** or **Status:** v1.0.0 pattern
    const versionMatch = content.match(/\*\*(?:Version|Status):\*\* v?([\d.]+)/);
    return versionMatch ? versionMatch[1] : null;
  } else {
    // Look for comment with version
    const versionMatch = content.match(/data-model\.md v([\d.]+)/);
    return versionMatch ? versionMatch[1] : null;
  }
}

function extractLastUpdated(content: string): string | null {
  const match = content.match(/\*\*Last Updated:\*\* (.+)/);
  return match ? match[1].trim() : null;
}


function validate(): ValidationResult {
  const result: ValidationResult = {
    success: true,
    errors: [],
    warnings: []
  };

  // Read files
  if (!fs.existsSync(TYPES_FILE)) {
    result.errors.push(`types.ts not found at ${TYPES_FILE}`);
    result.success = false;
    return result;
  }

  if (!fs.existsSync(DATA_MODEL_FILE)) {
    result.errors.push(`data-model.md not found at ${DATA_MODEL_FILE}`);
    result.success = false;
    return result;
  }

  const typesContent = fs.readFileSync(TYPES_FILE, 'utf-8');
  const dataModelContent = fs.readFileSync(DATA_MODEL_FILE, 'utf-8');

  // Extract versions
  const typesVersion = extractVersion(typesContent, false);
  const dataModelVersion = extractVersion(dataModelContent, true);

  if (!typesVersion) {
    result.warnings.push('types.ts does not reference a data-model.md version');
  }

  if (!dataModelVersion) {
    result.warnings.push('data-model.md does not have a version number');
  }

  if (typesVersion && dataModelVersion && typesVersion !== dataModelVersion) {
    result.errors.push(
      `Version mismatch: types.ts references v${typesVersion} but data-model.md is v${dataModelVersion}`
    );
    result.success = false;
  }

  // Extract type/interface definitions and fields
  const typesDefs = extractTypeDefinitions(typesContent);
  const dataModelDefs = extractDataModelDefinitions(dataModelContent);

  // Check for types in data-model.md but not in types.ts
  const missingInTypes: string[] = [];
  Object.keys(dataModelDefs).forEach(typeName => {
    if (!typesDefs[typeName]) {
      missingInTypes.push(typeName);
    }
  });

  // Check for types in types.ts but not in data-model.md
  const missingInDataModel: string[] = [];
  Object.keys(typesDefs).forEach(typeName => {
    if (!dataModelDefs[typeName]) {
      missingInDataModel.push(typeName);
    }
  });

  if (missingInTypes.length > 0) {
    result.errors.push(
      `Types defined in data-model.md but missing in types.ts: ${missingInTypes.join(', ')}`
    );
    result.success = false;
  }

  if (missingInDataModel.length > 0) {
    result.warnings.push(
      `Types defined in types.ts but not documented in data-model.md: ${missingInDataModel.join(', ')}`
    );
  }

  // Compare fields for types/interfaces present in both
  Object.keys(typesDefs).forEach(typeName => {
    if (dataModelDefs[typeName]) {
      const codeFields = typesDefs[typeName];
      const docFields = dataModelDefs[typeName];
      const codeFieldNames = Object.keys(codeFields);
      const docFieldNames = Object.keys(docFields);
      const missingFieldsInCode = docFieldNames.filter(f => !(f in codeFields));
      const missingFieldsInDoc = codeFieldNames.filter(f => !(f in docFields));
      const mismatchedFields = codeFieldNames.filter(f => docFields[f] && codeFields[f] !== docFields[f]);
      if (missingFieldsInCode.length || missingFieldsInDoc.length || mismatchedFields.length) {
        result.warnings.push(
          `Type '${typeName}' field mismatch:` +
          (missingFieldsInCode.length ? `\n  Fields in data-model.md but missing in types.ts: ${missingFieldsInCode.join(', ')}` : '') +
          (missingFieldsInDoc.length ? `\n  Fields in types.ts but missing in data-model.md: ${missingFieldsInDoc.join(', ')}` : '') +
          (mismatchedFields.length ? `\n  Fields with type mismatch: ${mismatchedFields.map(f => `${f} (types.ts: ${codeFields[f]}, data-model.md: ${docFields[f]})`).join('; ')}` : '')
        );
      }
    }
  });

  // Check last updated dates
  const typesLastUpdated = typesContent.match(/Last sync: (.+)/)?.[1]?.trim();
  const dataModelLastUpdated = extractLastUpdated(dataModelContent);

  if (typesLastUpdated && dataModelLastUpdated && typesLastUpdated !== dataModelLastUpdated) {
    result.warnings.push(
      `Last updated dates differ: types.ts (${typesLastUpdated}) vs data-model.md (${dataModelLastUpdated})`
    );
  }

  return result;
}

// Run validation
const result = validate();

console.log('\n🔍 Type Sync Validation\n');

if (result.errors.length > 0) {
  console.log('❌ ERRORS:');
  result.errors.forEach(err => console.log(`   - ${err}`));
}

if (result.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  result.warnings.forEach(warn => console.log(`   - ${warn}`));
}

if (result.success && result.warnings.length === 0) {
  console.log('✅ types.ts and data-model.md are in sync!\n');
} else if (result.success) {
  console.log('\n✅ No critical errors, but see warnings above.\n');
} else {
  console.log('\n❌ Validation failed. Please sync types.ts and data-model.md.\n');
  process.exit(1);
}

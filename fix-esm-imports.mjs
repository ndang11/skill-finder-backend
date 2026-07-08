// fix-esm-imports.mjs
// Adds .js extension to all relative imports in TypeScript source files.
// Required when using "module": "nodenext" in tsconfig.json (ESM mode).

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

function getAllTsFiles(dir) {
  const result = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      result.push(...getAllTsFiles(fullPath));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
      result.push(fullPath);
    }
  }
  return result;
}

const srcDir = './src';
const files = getAllTsFiles(srcDir);

let totalFixed = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf-8');

  // Match relative imports/exports that do NOT already end with .js
  // Handles: import ... from './foo'  |  export ... from '../bar'  |  import './baz'
  const updated = original.replace(
    /(from\s+['"])(\.\.?\/[^'"]+?)(?<!\.js)(['"]\s*;?)/g,
    '$1$2.js$3'
  ).replace(
    /(import\s+['"])(\.\.?\/[^'"]+?)(?<!\.js)(['"])/g,
    '$1$2.js$3'
  );

  if (updated !== original) {
    writeFileSync(file, updated, 'utf-8');
    console.log(`  ✔ Fixed: ${file}`);
    totalFixed++;
  }
}

console.log(`\nDone. Fixed ${totalFixed} file(s).`);

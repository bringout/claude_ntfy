#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Function to recursively process all .js files in a directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (stat.isFile() && path.extname(file) === '.js') {
      processFile(filePath);
    }
  });
}

// Function to process a single .js file and add .js extensions to relative imports
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Match import statements with relative paths that don't have extensions
  const importRegex = /(import\s+.*?from\s+['"])(\.[^'"]+)(['"])/g;
  content = content.replace(importRegex, (match, prefix, importPath, suffix) => {
    // If it's a relative import and doesn't already have an extension, add .js
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      if (!importPath.endsWith('.js') && !importPath.endsWith('.json')) {
        return `${prefix}${importPath}.js${suffix}`;
      }
    }
    return match;
  });
  
  // Match require statements with relative paths that don't have extensions
  const requireRegex = /(require\(['"])(\.[^'"]+)(['"]\))/g;
  content = content.replace(requireRegex, (match, prefix, requirePath, suffix) => {
    // If it's a relative import and doesn't already have an extension, add .js
    if (requirePath.startsWith('./') || requirePath.startsWith('../')) {
      if (!requirePath.endsWith('.js') && !requirePath.endsWith('.json')) {
        return `${prefix}${requirePath}.js${suffix}`;
      }
    }
    return match;
  });
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Processed ${filePath}`);
}

// Process the dist directory
processDirectory('./dist');
console.log('Finished processing import paths');
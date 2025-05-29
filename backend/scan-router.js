const fs = require('fs');
const path = require('path');

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes(`require('router')`) || content.includes(`require("router")`)) {
        console.log(`⚠️  Found 'require("router")' in: ${fullPath}`);
      }
    }
  });
}

console.log('🔍 Scanning project for require("router")...');
scanDirectory(__dirname);
console.log('✅ Scan completed.');

import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'index.html',
  'css/style.css',
  'Dockerfile'
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Required file not found: ${file}`);
  }
}

const html = readFileSync('index.html', 'utf8');

if (!html.includes('AMM Materiais de Construção')) {
  throw new Error('Expected AMM page title/content was not found.');
}

if (!html.includes('WhatsApp')) {
  throw new Error('Expected WhatsApp contact reference was not found.');
}

console.log('Smoke test passed: AMM static site structure is valid.');

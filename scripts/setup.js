#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Kiona AI...');

// Create directories
const dirs = [
  'logs',
  'data',
  'downloads',
  'models',
];

dirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created ${dir}/`);
  }
});

// Check dependencies
console.log('\n📦 Checking dependencies...');

const checks = [
  { name: 'Node.js', cmd: 'node --version' },
  { name: 'npm', cmd: 'npm --version' },
];

checks.forEach(check => {
  try {
    const version = execSync(check.cmd, { encoding: 'utf-8' }).trim();
    console.log(`✅ ${check.name}: ${version}`);
  } catch (e) {
    console.log(`❌ ${check.name}: Not installed`);
  }
});

// Check optional dependencies
console.log('\n📚 Checking optional dependencies...');

const optional = [
  { name: 'Python', cmd: 'python --version' },
  { name: 'PostgreSQL', cmd: 'psql --version' },
  { name: 'Ollama', cmd: 'ollama --version' },
];

optional.forEach(check => {
  try {
    const version = execSync(check.cmd, { encoding: 'utf-8' }).trim();
    console.log(`✅ ${check.name}: ${version}`);
  } catch (e) {
    console.log(`⚠️  ${check.name}: Not installed (optional)`);
  }
});

console.log('\n✨ Setup complete!');
console.log('\n📖 Next steps:');
console.log('1. Copy .env.example to .env.local');
console.log('2. Add your API keys to .env.local');
console.log('3. Run: npm run db:setup');
console.log('4. Run: npm run dev');
console.log('\n🚀 Happy coding!');

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🦙 Setting up Ollama models...');

const models = [
  'llama2',
  'mistral',
  'neural-chat',
];

const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

// Check if Ollama is running
try {
  execSync(`curl -s ${ollamaUrl}/api/tags`, { stdio: 'ignore' });
} catch (e) {
  console.error('❌ Ollama is not running!');
  console.log('Please install Ollama from https://ollama.ai and run: ollama serve');
  process.exit(1);
}

models.forEach(model => {
  try {
    console.log(`📥 Pulling ${model}...`);
    execSync(`ollama pull ${model}`, { stdio: 'inherit' });
    console.log(`✅ ${model} installed`);
  } catch (e) {
    console.error(`❌ Failed to pull ${model}`);
  }
});

console.log('\n✨ Setup complete!');

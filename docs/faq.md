# Kiona AI - Frequently Asked Questions

## Installation

**Q: What are the minimum requirements?**

A: Node.js 18+, Python 3.10+ (optional, for local models), and Ollama for local models.

**Q: Do I need API keys to use Kiona AI?**

A: No, you can use it with local models only. However, for cloud models (GPT-4, Claude, etc.), you'll need API keys.

**Q: Can I use it offline?**

A: Yes! Use local mode with Ollama. You won't need internet or API keys.

## Usage

**Q: How do I switch between models?**

A: Use the Settings panel or API endpoint `/api/models/switch`.

**Q: What's the difference between modes?**

A: 
- **Local**: Fast, offline, but limited quality
- **Cloud**: Higher quality, requires API keys
- **Hybrid**: Smart routing based on query complexity

**Q: Can I use multiple cloud providers at once?**

A: Yes! Set API keys for multiple providers and switch between them.

## Performance

**Q: Why is my local model slow?**

A: Local models perform better on GPUs. Ensure you have NVIDIA/AMD GPU support installed for Ollama.

**Q: How can I improve response speed?**

A: 
- Use smaller models (7B instead of 13B)
- Enable response streaming
- Use GPU acceleration
- Switch to cloud models

## Features

**Q: Is voice input/output working?**

A: Voice is implemented but requires ElevenLabs API key for TTS. STT uses OpenAI Whisper.

**Q: Can I customize the avatar?**

A: Yes! More avatars coming in future releases. Currently, 3 avatars available.

**Q: How do I add custom tools?**

A: Use `npm run add-tool --name=my-tool --github-url=...`

## Troubleshooting

**Q: I'm getting "Connection refused" errors**

A: 
1. Check if API server is running: `npm run dev:api`
2. Check if Ollama is running: `ollama serve`
3. Check if PostgreSQL is running: `docker-compose up postgres`

**Q: API key isn't being recognized**

A:
1. Ensure it's in `.env.local` (not `.env.example`)
2. Restart the server after adding keys
3. Check key format and validity

**Q: Voice output isn't working**

A:
1. Check browser audio permissions
2. Verify ElevenLabs API key
3. Check browser console for errors

## Development

**Q: How do I contribute?**

A: See CONTRIBUTING.md for guidelines.

**Q: Where can I report bugs?**

A: Open an issue on GitHub with details and steps to reproduce.

**Q: How can I request features?**

A: Create a discussion or issue with the feature-request label.

## Privacy & Security

**Q: Does Kiona AI store my conversations?**

A: Local mode doesn't send data anywhere. Cloud mode data handling depends on provider policies.

**Q: Is my API key secure?**

A: Yes, API keys are stored locally and encrypted. Never commit keys to git.

**Q: Can I use Kiona AI without internet?**

A: Yes, fully offline with local models.

## Deployment

**Q: Can I deploy Kiona AI on a server?**

A: Yes! Use Docker for easy deployment. See deployment documentation.

**Q: How much does it cost to run?**

A: Local mode is free. Cloud API costs depend on usage and provider pricing.

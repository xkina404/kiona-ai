# Contributing to Kiona AI

We welcome contributions! This document provides guidelines and instructions.

## Code of Conduct

Be respectful and inclusive. All are welcome.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/kiona-ai.git`
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Push to your fork: `git push origin feature/my-feature`
6. Create a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development
npm run dev
```

## Code Style

- Use TypeScript
- Follow ESLint rules
- Format with Prettier
- Use meaningful variable names
- Add JSDoc comments for public APIs

### Run Linters

```bash
npm run lint      # Check style
npm run format    # Auto-format code
```

## Testing

```bash
npm test          # Run all tests
npm test -- --watch  # Watch mode
```

## Commit Messages

Follow conventional commits:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass: `npm test`
4. Ensure code is formatted: `npm run format`
5. Add a clear description of changes
6. Link any related issues

## Areas for Contribution

- [ ] Live2D avatar integration improvements
- [ ] Additional model providers
- [ ] Voice provider integrations
- [ ] UI/UX improvements
- [ ] Documentation
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Tests
- [ ] Tools integration
- [ ] Mobile app (React Native)

## Architecture Guidelines

- Keep concerns separated
- Use dependency injection
- Write testable code
- Document complex logic
- Follow SOLID principles

## Performance Considerations

- Optimize bundle size
- Minimize API calls
- Cache appropriately
- Stream large responses
- Profile before optimizing

## Security

- Never commit API keys
- Validate all inputs
- Sanitize outputs
- Use HTTPS
- Keep dependencies updated

## Need Help?

- Check existing issues
- Read documentation
- Ask in Discussions
- Open an issue

Thank you for contributing! 🎉

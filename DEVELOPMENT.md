# Development Guide

This document provides information for developers working on the Nextcloud Notes Client.

## Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- Python (for native module compilation)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start the Electron app
- `npm run dev` - Start with development logging
- `npm run build` - Build the application
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run package` - Package the app for distribution

## Project Structure

```
app-source/
├── js/           # JavaScript source files
├── scss/         # Sass stylesheets
├── html/         # HTML templates
├── assets/       # Images and icons
└── i18n/         # Internationalization files

dist/             # Built files
tests/            # Test files
```

## Code Style

- ESLint configuration in `eslint.config.js`
- Prettier configuration in `.prettierrc`
- Use tabs for indentation
- Single quotes for strings
- No semicolons

## Testing

Tests are written using Jest and located in the `tests/` directory.

Run tests with:
```bash
npm test
```

## Building

The project uses Gulp for building. The build process:

1. Compiles Sass to CSS
2. Minifies HTML
3. Processes JavaScript
4. Copies assets and i18n files
5. Generates app icons

## Electron Security

The app follows Electron security best practices:
- Context isolation enabled
- Node integration disabled in renderer
- Preload script for secure IPC communication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
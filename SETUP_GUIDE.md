# Setup Guide: Publish to GitHub & Build Application

This guide will help you get the modernized Nextcloud Notes Client on GitHub and build it for use.

## Prerequisites

Before starting, ensure you have:

1. **Xcode Command Line Tools** (macOS):
   ```bash
   xcode-select --install
   ```

2. **Node.js 18+** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Or install via Homebrew: `brew install node`

3. **Git** (usually comes with Xcode tools):
   ```bash
   git --version
   ```

4. **GitHub Account**: [github.com](https://github.com)

## Step 1: Set Up Git Repository

1. **Navigate to project directory**:
   ```bash
   cd /Users/derekpiazza/Downloads/notes/nextcloud-notes-mac-client-master
   ```

2. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

3. **Configure Git** (first time only):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. **Add all files**:
   ```bash
   git add .
   ```

5. **Create initial commit**:
   ```bash
   git commit -m "Initial commit: Modernized Nextcloud Notes Client

   - Updated Electron from v13 to v32
   - Added TypeScript, ESLint, Prettier, Jest
   - Fixed security vulnerabilities (73 → 52)
   - Added GitHub Actions CI/CD
   - Enhanced build system and documentation"
   ```

## Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)
1. **Install GitHub CLI**:
   ```bash
   brew install gh
   ```

2. **Login to GitHub**:
   ```bash
   gh auth login
   ```

3. **Create repository**:
   ```bash
   gh repo create nextcloud-notes-client-modernized --public --description "Modernized Nextcloud Notes Client for macOS with enhanced security and developer tools"
   ```

4. **Push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nextcloud-notes-client-modernized.git
   git push -u origin main
   ```

### Option B: Manual GitHub Setup
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `nextcloud-notes-client-modernized`
3. Description: `Modernized Nextcloud Notes Client for macOS`
4. Make it **Public**
5. **Don't** initialize with README (we already have files)
6. Click "Create repository"
7. Follow the "push an existing repository" instructions shown

## Step 3: Build the Application

### Development Build (for testing)
```bash
# Install dependencies (if not done)
npm install

# Build the app
npm run build

# Test the app
npm start
```

### Production Build (distributable app)
```bash
# Build for your current platform
npm run package:dir

# Build distributable packages
npm run dist
```

The built app will be in the `build/` directory.

### Build for Multiple Platforms
```bash
# macOS (Intel)
npm run package

# macOS (Apple Silicon) 
npm run package-arm

# All platforms (requires specific setup)
npm run dist
```

## Step 4: Test Your Build

1. **Navigate to build directory**:
   ```bash
   cd build
   ls -la
   ```

2. **Run the app**:
   - Find the `.app` file in the build directory
   - Double-click to run, or:
   ```bash
   open "Nextcloud Notes Client.app"
   ```

## Step 5: Create a Release on GitHub

1. **Tag your release**:
   ```bash
   git tag -a v1.5.0 -m "Release v1.5.0: Modernized with security updates"
   git push origin v1.5.0
   ```

2. **GitHub will automatically**:
   - Run CI tests
   - Build for multiple platforms (via GitHub Actions)
   - Create release artifacts

3. **Manual release** (alternative):
   - Go to your GitHub repo
   - Click "Releases" → "Create a new release"
   - Choose your tag
   - Upload your built `.dmg` or `.app` files

## Available Scripts

After setup, you can use these commands:

```bash
# Development
npm start              # Run the app
npm run dev           # Run with development logging
npm test              # Run tests
npm run lint          # Check code quality
npm run format        # Format code

# Building
npm run build         # Build source files
npm run package       # Package for current platform
npm run dist          # Create distributable files

# Quality checks
npm run lint:fix      # Auto-fix linting issues
npm audit             # Check for vulnerabilities
```

## Troubleshooting

### Common Issues

1. **"xcrun: error: invalid active developer path"**
   ```bash
   sudo xcode-select --reset
   xcode-select --install
   ```

2. **Node.js version issues**:
   ```bash
   node --version  # Should be 18.x or higher
   ```

3. **Permission errors**:
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

4. **Build failures**:
   ```bash
   # Clean and rebuild
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### Getting Help

- Check the [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed development info
- Review GitHub Actions logs for CI/CD issues
- Check the original project: [dgmid/nextcloud-notes-mac-client](https://github.com/dgmid/nextcloud-notes-mac-client)

## What's Modernized

✅ **Security**: Updated Electron & dependencies, fixed 73→52 vulnerabilities  
✅ **Development**: Added TypeScript, ESLint, Prettier, Jest  
✅ **CI/CD**: GitHub Actions for automated testing and building  
✅ **Build**: Modern electron-builder, cross-platform support  
✅ **Documentation**: Comprehensive setup and development guides  

The app maintains all original functionality while being significantly more secure and maintainable.
# Nextcloud Notes Client (Modernized)

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) 
![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Electron](https://img.shields.io/badge/electron-32.x-blue)
[![Security](https://img.shields.io/badge/vulnerabilities-52%20(from%2073)-orange)](https://github.com/your-username/nextcloud-notes-client-modernized)

**A modernized, secure replacement for the Mac Notes app that syncs with Nextcloud Notes**

This is a significantly updated version of the original [Nextcloud Notes Mac Client](https://github.com/dgmid/nextcloud-notes-mac-client) with enhanced security, modern development tools, and improved maintainability.

## ✨ What's New in This Version

- 🔒 **Enhanced Security**: Updated Electron from v13 to v32, reduced vulnerabilities from 73 to 52
- 🛠️ **Modern Development**: Added TypeScript, ESLint, Prettier, Jest testing framework
- 🚀 **CI/CD Pipeline**: GitHub Actions for automated testing and building
- 📦 **Better Building**: Modern electron-builder with cross-platform support
- 🔧 **Developer Experience**: Comprehensive linting, formatting, and documentation

![Nextcloud Notes Client in edit mode](https://user-images.githubusercontent.com/1267580/78501862-14557f00-775e-11ea-8c6a-8d5cf2ab9a83.png)
<small>*Nextcloud Notes Client in edit mode (dark theme)*</small>

![Nextcloud Notes Client in edit mode](https://user-images.githubusercontent.com/1267580/78501864-1a4b6000-775e-11ea-8d7f-808181def3da.png)
<small>*Nextcloud Notes Client in edit mode (light theme)*</small>

![Nextcloud Notes Client in preview mode](https://user-images.githubusercontent.com/1267580/78501977-ea508c80-775e-11ea-881e-c22e4c7f2c53.png)
<small>*Nextcloud Notes Client in preview mode (dark theme)*</small>

![Nextcloud Notes Client in preview mode](https://user-images.githubusercontent.com/1267580/78501983-f0df0400-775e-11ea-9e56-1fa0b6ccbe34.png)
<small>*Nextcloud Notes Client in preview mode (light theme)*</small>

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Xcode Command Line Tools** (macOS): `xcode-select --install`

### Installation & Build
```bash
# Clone or download this repository
cd nextcloud-notes-client-modernized

# Install dependencies
npm install

# Build the application
npm run build

# Run the app
npm start

# Build distributable app
npm run package:dir
```

The built app will be in `build/mac-arm64/Nextcloud Notes Client.app`

### Development
```bash
# Run with development tools
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 📖 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup and GitHub publishing guide
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development guide and coding standards

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the application |
| `npm run dev` | Run with development logging |
| `npm run build` | Build source files |
| `npm test` | Run tests |
| `npm run lint` | Check code quality |
| `npm run format` | Format code with Prettier |
| `npm run package:dir` | Build app package |
| `npm run dist` | Create distributable files |

## i18n
Translations for this app are by:

| language | translator |
| --- | --- |
| EN | [dgmid](https://github.com/dgmid) |
| IT | [dgmid](https://github.com/dgmid) |
| DE | [stratmaster](https://github.com/stratmaster) |
| ES | Juan Velasco |
| FR | Alain Grau |

## Support me
**Nextcloud Notes Client** is free,
but if you would like to make a small donation to its ongoing development you can do so here:

[![Donate button](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EBVEE9526GTYJ&item_name=help+support+ongoing+development+of+this+software&currency_code=EUR)

This will help fund the further development of this software.

# EZdiff

A modern, user-friendly diff tool built with Electron and React.

## Features

- Modern and intuitive user interface
- Cross-platform support (macOS, Windows)
- Real-time diff visualization
- Support for multiple file formats
- Customizable themes and layouts

## Installation

### From Release

Download the latest release for your platform:
- macOS: `.dmg` or `.zip`
- Windows: `.exe` or `.zip`

### From Source

```bash
# Clone the repository
git clone https://github.com/zakelfassi/ezdiff.git
cd ezdiff

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

## System Requirements

### macOS
- macOS 10.15 (Catalina) or later
- Node.js 18.x or later
- Yarn package manager

### Windows
- Windows 10 or later
- Node.js 18.x or later
- Yarn package manager
- Windows Build Tools (for development)

## Development

```bash
# Start development server
yarn dev

# Run tests
yarn test

# Build for production
yarn build

# Package the app
yarn package:mac    # For macOS
yarn package:win    # For Windows
yarn package:all    # For all platforms
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/)
- [React](https://reactjs.org/)
- [electron-builder](https://www.electron.build/)

# Installed Packages Reference

## Overview

This document lists all packages installed in the project, their versions, and their purposes.

## Production Dependencies

These packages are required for the application to run in production.

### React Core Libraries

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^19.2.0 | Core React library for building user interfaces with components and hooks |
| **react-dom** | ^19.2.0 | React renderer for the DOM, provides methods like `createRoot()` |

**Usage in project:**
- Used in `src/main.tsx` to render the application
- Used in `src/App.tsx` for component structure and hooks (useState, useMemo)

### Excel Export Library

| Package | Version | Purpose |
|---------|---------|---------|
| **xlsx** | ^0.18.5 | Library for reading and writing Excel files (.xlsx format) |

**Usage in project:**
- Used in `src/App.tsx` for exporting account data to Excel
- Functions used: `utils.json_to_sheet()`, `utils.book_new()`, `writeFile()`

## Development Dependencies

These packages are only needed during development and are not included in the production build.

### TypeScript Support

| Package | Version | Purpose |
|---------|---------|---------|
| **typescript** | ~5.9.3 | TypeScript compiler for type checking and compilation |
| **@types/react** | ^19.2.3 | TypeScript type definitions for React |
| **@types/react-dom** | ^19.2.3 | TypeScript type definitions for React DOM |

**Usage in project:**
- TypeScript is used for all source files (.tsx, .ts)
- Type definitions provide IntelliSense and type checking in IDEs
- Configured in `tsconfig.json`

### Build Tools

| Package | Version | Purpose |
|---------|---------|---------|
| **vite** | npm:rolldown-vite@7.2.2 | Fast build tool and development server |
| **@vitejs/plugin-react** | ^5.1.1 | Vite plugin that enables React support (JSX, Fast Refresh) |

**Usage in project:**
- Vite provides the dev server (`npm run dev`)
- Handles bundling and optimization for production builds
- Configured in `vite.config.ts`
- React plugin enables JSX transformation and hot module replacement

## Package Installation

All packages are installed via npm and listed in `package.json`.

### Install Command
```bash
npm install
```

This reads `package.json` and installs all dependencies listed above.

### Lock File
`package-lock.json` ensures consistent installations across different environments by locking exact versions of all dependencies (including transitive dependencies).

## Version Ranges Explained

- `^19.2.0` - Allows updates to any version compatible with 19.2.0 (same major version)
- `~5.9.3` - Allows patch-level changes (5.9.x)
- `npm:rolldown-vite@7.2.2` - Specific package alias pointing to rolldown-vite version 7.2.2

## Total Package Count

- **Production Dependencies**: 3 packages
- **Development Dependencies**: 5 packages
- **Total Direct Dependencies**: 8 packages
- **Total Dependencies** (including transitive): ~80+ packages

## Updating Packages

### Check for updates:
```bash
npm outdated
```

### Update a specific package:
```bash
npm update <package-name>
```

### Update all packages:
```bash
npm update
```

### Update to latest versions (may break compatibility):
```bash
npm install <package>@latest
```

## Security

To check for security vulnerabilities:
```bash
npm audit
```

To fix automatically fixable issues:
```bash
npm audit fix
```

## Package Sizes (Approximate)

- **react**: ~130 KB
- **react-dom**: ~130 KB
- **xlsx**: ~2.5 MB (includes full Excel parsing capabilities)
- **vite**: ~15 MB (development tool, not included in production)
- **typescript**: ~60 MB (development tool, not included in production)

**Note**: Production bundle size is optimized by Vite and tree-shaking removes unused code.

## Alternative Package Managers

This project uses npm, but can also work with:

- **yarn**: `yarn install`
- **pnpm**: `pnpm install`

Make sure to use the corresponding lock file:
- `package-lock.json` (npm)
- `yarn.lock` (yarn)
- `pnpm-lock.yaml` (pnpm)


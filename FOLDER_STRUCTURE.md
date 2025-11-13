# Project Folder Structure

## Complete Directory Tree

```
application/
│
├── 📁 public/                          # Public static assets
│   └── vite.svg                        # Vite logo (favicon)
│
├── 📁 src/                             # Source code directory
│   ├── App.tsx                         # Main React component
│   │                                   # - Table component with pagination
│   │                                   # - Search and filter functionality
│   │                                   # - Add account form modal
│   │                                   # - Excel export functionality
│   │                                   # - Checkbox selection logic
│   │
│   ├── main.tsx                        # Application entry point
│   │                                   # - React DOM root setup
│   │                                   # - Renders App component
│   │
│   ├── style.css                       # Global stylesheet
│   │                                   # - Table styling
│   │                                   # - Modal and form styles
│   │                                   # - Toast notification styles
│   │                                   # - Responsive design
│   │
│   ├── counter.ts                      # (Unused - legacy file)
│   └── typescript.svg                  # (Unused - legacy file)
│
├── 📁 dist/                            # Production build output (generated)
│   ├── 📁 assets/                      # Compiled and optimized assets
│   │   ├── index-[hash].css            # Minified CSS bundle
│   │   └── index-[hash].js             # Minified JavaScript bundle
│   ├── index.html                      # Production HTML file
│   └── vite.svg                        # Copied static asset
│
├── 📁 node_modules/                    # NPM dependencies (generated)
│   ├── react/                          # React library
│   ├── react-dom/                      # React DOM library
│   ├── xlsx/                           # Excel file library
│   ├── vite/                           # Vite build tool
│   ├── typescript/                     # TypeScript compiler
│   └── [other dependencies...]         # Additional packages
│
├── 📄 index.html                       # HTML template
│                                       # - Root div for React
│                                       # - Script entry point
│
├── 📄 package.json                     # Project configuration
│                                       # - Dependencies list
│                                       # - Scripts (dev, build, preview)
│                                       # - Project metadata
│
├── 📄 package-lock.json                # Locked dependency versions
│                                       # - Ensures consistent installs
│                                       # - Generated automatically
│
├── 📄 tsconfig.json                    # TypeScript configuration
│                                       # - Compiler options
│                                       # - Strict mode settings
│                                       # - Module resolution
│
├── 📄 vite.config.ts                   # Vite build configuration
│                                       # - React plugin setup
│                                       # - Build options
│
├── 📄 .gitignore                       # Git ignore rules
│                                       # - Excludes node_modules, dist, etc.
│
├── 📄 README.md                        # Project documentation
│                                       # - Setup instructions
│                                       # - Usage guide
│                                       # - Feature list
│
└── 📄 FOLDER_STRUCTURE.md              # This file
                                        # - Detailed folder structure
```

## Key Files Explained

### Source Files (`src/`)

#### `App.tsx`
- **Purpose**: Main application component
- **Features**:
  - Account data management (80 initial accounts)
  - Table rendering with pagination
  - Search and filter logic
  - Sort functionality
  - Checkbox selection state
  - Excel export handler
  - Add account form modal
  - Toast notification display

#### `main.tsx`
- **Purpose**: Application entry point
- **Function**: Initializes React and mounts the App component to the DOM

#### `style.css`
- **Purpose**: Global stylesheet
- **Contains**:
  - Page layout styles
  - Table styling (header, rows, cells)
  - Button and form styles
  - Modal overlay and content
  - Toast notification animation
  - Responsive breakpoints

### Configuration Files

#### `package.json`
- Lists all project dependencies
- Defines npm scripts (dev, build, preview)
- Contains project metadata

#### `tsconfig.json`
- TypeScript compiler configuration
- Strict type checking enabled
- React JSX support configured

#### `vite.config.ts`
- Vite build tool configuration
- React plugin integration
- Development server settings

### Build Output (`dist/`)

Generated when running `npm run build`:
- Optimized and minified JavaScript bundle
- Minified CSS bundle
- Production-ready HTML
- Static assets

### Dependencies (`node_modules/`)

Contains all installed packages:
- **React** - UI library
- **React DOM** - DOM rendering
- **XLSX** - Excel file generation
- **Vite** - Build tool and dev server
- **TypeScript** - Type checking and compilation
- Plus all transitive dependencies

## File Size Estimates

- `src/App.tsx`: ~15-20 KB (source code)
- `src/style.css`: ~10-15 KB (styles)
- `dist/assets/index-[hash].js`: ~480 KB (production bundle, gzipped ~157 KB)
- `dist/assets/index-[hash].css`: ~7 KB (production CSS, gzipped ~2 KB)

## Development Workflow

1. **Edit source files** in `src/`
2. **View changes** in browser (dev server auto-reloads)
3. **Build for production** → generates `dist/`
4. **Deploy** `dist/` folder to web server

## Notes

- `dist/` and `node_modules/` should never be committed to version control
- Source files are in `src/`
- Configuration files are in the root directory
- Static assets go in `public/` (copied to `dist/` during build)


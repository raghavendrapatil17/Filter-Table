# React Table Component with Pagination and Excel Export

A modern React application featuring a data table with pagination, filtering, sorting, and Excel export functionality. Built with React, TypeScript, and Vite.

## Features

- ✅ **Data Table with Pagination** - View accounts with configurable items per page
- ✅ **Search Functionality** - Search by account name, ID, or SPOC
- ✅ **Status Filtering** - Filter accounts by status (NEW, ASSIGNED, ONBOARDING, IN_REVIEW)
- ✅ **Sortable Columns** - Click column headers to sort data
- ✅ **Checkbox Selection** - Select individual accounts or all on current page
- ✅ **Excel Export** - Export selected or all filtered accounts to .xlsx file
- ✅ **Add Account Form** - Modal form to add new accounts with validation
- ✅ **Toast Notifications** - User feedback for account creation
- ✅ **Responsive Design** - Works on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn**

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd application
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages listed in `package.json`.

## Available Scripts

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Create a production build:
```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
application/
├── public/                 # Static assets
│   └── vite.svg           # Vite logo
├── src/                    # Source code
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── style.css          # Global styles
│   ├── counter.ts         # (Unused - can be removed)
│   └── typescript.svg     # (Unused - can be removed)
├── dist/                   # Production build output (generated)
│   ├── assets/            # Compiled CSS and JS files
│   └── index.html         # Production HTML
├── node_modules/           # Dependencies (generated)
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # This file
```

## Installed Packages

### Dependencies

- **react** (^19.2.0) - React library for building user interfaces
- **react-dom** (^19.2.0) - React DOM renderer
- **xlsx** (^0.18.5) - Library for reading and writing Excel files

### Dev Dependencies

- **@types/react** (^19.2.3) - TypeScript type definitions for React
- **@types/react-dom** (^19.2.3) - TypeScript type definitions for React DOM
- **@vitejs/plugin-react** (^5.1.1) - Vite plugin for React support
- **typescript** (~5.9.3) - TypeScript compiler
- **vite** (npm:rolldown-vite@7.2.2) - Fast build tool and dev server

## Usage

### Adding an Account

1. Click the **"Add Account"** button
2. Fill in the First Name and Last Name fields
3. Click **"Submit"**
4. A toast notification will confirm the account was added

### Filtering Accounts

- Use the search box to filter by account name, ID, or SPOC
- Select a status from the "Filter by status" dropdown to filter by status

### Sorting

- Click any column header to sort by that column
- Click again to reverse the sort order
- Click a third time to remove sorting

### Selecting Accounts

- Click individual checkboxes to select specific accounts
- Click the header checkbox to select/deselect all accounts on the current page
- Selected accounts persist when navigating between pages

### Exporting Data

- Click **"Export All"** to export data to Excel
- If accounts are selected, only selected accounts will be exported
- If no accounts are selected, all filtered accounts will be exported
- The exported file will be named `accounts.xlsx`

## Configuration

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Configuration is in `tsconfig.json`.

### Vite Configuration

Vite is configured with React plugin support. Configuration is in `vite.config.ts`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- The application uses React Hooks for state management
- All data is currently stored in component state (no backend)
- Account IDs are auto-generated in the format `ACC####`
- Initial data includes 80 sample accounts with Indian names

#
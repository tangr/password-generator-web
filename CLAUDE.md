# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Start Development

```bash
npm start
# or
yarn start
```

Runs the app at http://localhost:3000

### Build

```bash
npm run build
# or
yarn build
```

### Testing

```bash
# Open Cypress interactive test runner
npm run cypress-open
# or
yarn cypress-open

# Run Cypress tests headlessly
npm run cypress-run
# or
yarn cypress-run

# Run React tests
npm test
# or
yarn test
```

### Docker Development

```bash
# Setup containers
sh ./scripts/docker-compose-setup.sh

# Start server
sh ./scripts/start-server.sh

# Run tests
sh ./scripts/run-tests.sh
```

## Architecture Overview

This is a single-page React application for generating customizable passwords. The architecture is straightforward:

### Core Application Structure

- **Entry Point**: `src/index.tsx` renders the App component into the DOM
- **Main App**: `src/App.tsx` provides ThemeProvider and renders the main component
- **Single Main Component**: `src/components/PasswordGeneratorMain/index.tsx` contains all password generation logic and UI

### Key Dependencies

- **Password Generation**: Uses `@password-generator/package` for core password generation
- **Password Strength**: Uses `@password-generator/check-strength` for strength analysis
- **Styling**: Styled Components with a theme system in `src/styles/theme.ts`
- **Notifications**: React Toastify for user feedback

### Password Generation Logic

The main component manages:

- Password preferences state (length, character types, pronounceable mode)
- Settings caching for pronounceable mode toggle
- Password generation via external package
- Strength checking and display
- Clipboard functionality

### Pronounceable Mode Behavior

When pronounceable mode is enabled:

- Current character type settings are cached
- All character type options are disabled and set to false
- When disabled, cached settings are restored

### Testing Strategy

- Uses Cypress for E2E testing with comprehensive password generation scenarios
- Tests are located in `cypress/integration/generate_password.spec.ts`
- Custom Cypress command `getByTestId` for consistent element selection
- All interactive elements have `data-test-id` attributes

### Styling Architecture

- Uses styled-components with a centralized theme
- Theme colors defined in `src/styles/theme.ts`
- Global styles in `src/styles/GlobalStyle.ts`
- Component-specific styles co-located in `components/*/styles.ts`

## Important Notes

- The application is a single-component app - most logic is in `PasswordGeneratorMain`
- Password generation and strength checking are handled by external packages
- The app includes Service Worker registration for PWA capabilities
- Docker configuration supports both development and testing environments
- TypeScript is configured with strict mode enabled

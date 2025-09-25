# Star Wars Character Explorer Demo

**Live Demo**: https://dasein108.github.io/star-wars-demo/


A modern web application for browsing and exploring Star Wars characters using the SWAPI (Star Wars API). Features responsive design, offline character editing, and a sleek dark theme.

- **Dark Theme**: Star Wars-inspired color scheme

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI v5
- **Routing**: React Router v6 (HashRouter)
- **Build Tool**: Vite
- **Database**: Dexie.js (IndexedDB wrapper)
- **HTTP Client**: Axios
- **Form Management**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript type checking

## Deployment

The application is automatically deployed to GitHub Pages on every push to the `main` branch using GitHub Actions.


### Manual Deployment Setup

1. Push code to GitHub repository
2. Go to repository **Settings → Pages**
3. Set **Source** to "GitHub Actions"
4. The workflow will deploy automatically

## Development

- **API**: Uses SWAPI (https://swapi.py4e.com/) for character data
- **Storage**: Character modifications are stored locally using Dexie.js
- **Testing**: 22 tests covering utilities, components, and routing
- **Code Quality**: ESLint, TypeScript strict mode, Prettier formatting

## License

MIT

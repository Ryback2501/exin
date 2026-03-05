# Exin

Exin is a web app that shows currency exchange changes and lets you work with multiple currency pairs at the same time.  
For each pair, you can also enter multiple amounts in parallel to compare conversions quickly.

This is a simple app built to test the possibilities of [lovable.dev](https://lovable.dev).

## Table of Contents

- [Try It](#try-it)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Notes](#notes)
- [Contributing](#contributing)
- [License](#license)

## Try It

Use the live app here: [https://exin.lovable.app](https://exin.lovable.app)

## Features

- Multi-pair workflow with tab-based navigation.
- Multiple amount rows per pair (auto-add rows while typing).
- Two-way conversion editing (`from -> to` and `to -> from`).
- Live exchange rate fetching from ExchangeRate-API.
- Lightweight historical-style chart visualization for each pair.
- Currency search and pair selection modal.
- PWA setup with service worker registration.

## Tech Stack

Based on the source code, Exin is built with:

- **Frontend framework:** React 18 + TypeScript
- **Build tool:** Vite 5 (`@vitejs/plugin-react-swc`)
- **Routing:** React Router (`react-router-dom`)
- **Data fetching/cache:** TanStack Query (`@tanstack/react-query`)
- **Styling:** Tailwind CSS + `tailwindcss-animate`
- **UI primitives:** Radix UI components + shadcn/ui-style component structure
- **Charts:** Recharts
- **Icons:** Lucide React
- **PWA:** `vite-plugin-pwa` + `virtual:pwa-register`
- **Linting:** ESLint + TypeScript ESLint
- **Testing:** Vitest + Testing Library + JSDOM
- **Package managers used in repo:** npm and Bun lockfiles are present

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm (or Bun)

### Installation

```bash
npm install
```

Or with Bun:

```bash
bun install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint and Test

```bash
npm run lint
npm run test
```

## Project Structure

```text
src/
  components/      UI and feature components (tabs, selector, table, chart)
  hooks/           Data/query hooks
  pages/           Route pages
  services/        API integration (ExchangeRate-API)
  data/            Currency catalog and related types
```

## Notes

- Exchange rates are requested from `https://v6.exchangerate-api.com`.
- The chart is a generated trend visualization anchored to the latest fetched rate.
- The app currently focuses on a compact, fast experimentation flow.

## Contributing

Contributions are welcome. If you want to improve Exin, open an issue or submit a pull request with a clear description of the change.

## License

This project is licensed under the MIT License.

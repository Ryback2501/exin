# Exin

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Built with Claude Code](https://img.shields.io/badge/-Claude_Code-000000?logo=claude&logoColor=white)](https://claude.ai/code)
[![GitHub Release](https://img.shields.io/github/v/release/Ryback2501/exin)](https://github.com/Ryback2501/exin/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/Ryback2501/exin/release.yml?label=release)](https://github.com/Ryback2501/exin/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docker Hub](https://img.shields.io/badge/docker-ryback2501%2Fexin-2496ED?logo=docker&logoColor=white)](https://hub.docker.com/r/ryback2501/exin)
[![Docker Pulls](https://img.shields.io/docker/pulls/ryback2501/exin?logo=docker&logoColor=white)](https://hub.docker.com/r/ryback2501/exin)
[![GitHub Stars](https://img.shields.io/github/stars/Ryback2501/exin?style=flat&logo=github)](https://github.com/Ryback2501/exin/stargazers)

Exin is a currency-exchange calculator for the browser. Work with **multiple currency pairs at once**, enter several amounts per pair in parallel to compare conversions at a glance, and watch how rates move over time with live data and historical charts. It runs entirely in your browser as a PWA — no backend, no accounts.

> Vibe-coded with [Claude Code](https://claude.ai/code). Originally bootstrapped with [Lovable](https://lovable.dev).

## Features

- Multi-pair workflow with tab-based navigation.
- Multiple amount rows per pair (rows auto-add while typing).
- Two-way conversion editing (`from → to` and `to → from`).
- Live exchange rates from `@fawazahmed0/currency-api` (CDN) with a fallback endpoint.
- Historical chart data from dated API snapshots with selectable periods (`1W`, `1M`, `1Y`).
- Currency search and pair-selection modal.
- Installable PWA with offline service worker.

## Use it!

### Try it online

Just open **[ryback2501.github.io/exin](https://ryback2501.github.io/exin/)** — no install required.

### Docker

Pull and run the latest image:

```bash
docker run -d \
  --name exin \
  -p 8080:80 \
  --restart unless-stopped \
  ryback2501/exin:latest
```

The app runs at `http://localhost:8080`.

### Run from the source code

**Prerequisites:** [Node.js 20+](https://nodejs.org/).

1. Clone the repository:
   ```bash
   git clone https://github.com/Ryback2501/exin.git
   cd exin
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start it:
   ```bash
   npm run dev
   ```
   Then open the URL Vite prints (`http://localhost:8080/exin/`).

To build a production bundle and preview it instead:

```bash
npm run build
npm run preview
```

## Contributing

Contributions and ideas are welcome. The repository is public — anyone can fork it and open a pull request.

If you have a suggestion, found a bug, or want to discuss a change before implementing it, [open an issue](https://github.com/Ryback2501/exin/issues) — it's the best place to start.

To contribute code:

1. Fork the repository
2. Create a branch from `dev`: `git checkout -b feature/your-feature` (use `feature/*`, `bug/*`, or `chore/*`)
3. Make your changes and commit following [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a pull request targeting the `dev` branch

Please keep PRs focused — one feature or fix per PR.

## License

[MIT](LICENSE)

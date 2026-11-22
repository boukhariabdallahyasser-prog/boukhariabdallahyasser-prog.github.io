# SPIDER — Abdallah Boukhari Yasser

React + TypeScript + Vite + Motion. Node.js 22 runs the build pipeline, tests, and optional production HTTP server. No database or backend API is necessary for this public portfolio.

## Local development

```bash
npm install
npm run dev
npm test
npm run build
npm start
```

## Deployment

The GitHub Actions workflow builds and publishes `dist/` to GitHub Pages. If Pages is not enabled for Actions, go to Settings → Pages → Source → GitHub Actions, then run the Deploy SPIDER workflow. The previous static `index.html` remains at the repository root as a temporary branch-publishing fallback; Vite builds `site/index.html` instead.

GitHub Pages hosts static production assets, not the Node server. For a Node-capable host, run `npm install && npm run build` and then `npm start`.

## Structure

- `site/src/components/`: independent React components
- `site/src/data/network.ts`: typed network model
- `site/src/styles.css`: editorial design tokens and responsive styling
- `tests/`: Node unit tests
- `server.mjs`: optional production server

SHIFAA imagery is a conceptual diagram, not an actual screenshot. Project metrics and technical contributions are not invented.

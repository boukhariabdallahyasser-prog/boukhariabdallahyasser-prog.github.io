# YZR — Abdallah Boukhari Yasser

React, TypeScript, Vite, Three.js, Motion and Node.js. The entrance features a 3D rendition of the owner's supplied YZR logo. The portfolio guide uses local FAQ answers, and all sound is optional and synthesized after user interaction.

## Development
Run npm install, npm test, npm run build and npm run dev. The compiled site is in dist. npm start serves that directory using Node.js.

GitHub Actions deploys the Vite build to GitHub Pages. Vercel is configured via vercel.json.


## Publishing
The production workflow stamps the source commit in the built HTML and release.json, synchronizes the generated root fallback, deploys dist to GitHub Pages, and verifies the live URL. The root index and assets are generated, not hand-edited. For a single publishing path, the repository owner should select Settings → Pages → Build and deployment → Source → GitHub Actions. No application design change is involved.

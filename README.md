## Hack Heist — The Ultimate College Hackathon

Dark, cinematic single-page site inspired by Money Heist. Built with React (Vite), Tailwind CSS, and Framer Motion. Routes: `/`, `/about`, `/schedule`, `/register`, `/sponsors`, `/contact`.

### Quick start

1. Install deps

```bash
npm i
```

2. Dev server

```bash
npm run dev
```

3. Build

```bash
npm run build && npm run preview
```

### Tech

- React 19, React Router
- Tailwind CSS (custom colors: black, heist-red `#b30000`, muted-gray `#1f1f1f`)
- Framer Motion animations
- Accessible UI: keyboard-friendly nav, forms, ARIA on accordions and modal

### Mock backend

- Dev server mocks `POST /api/register` in `vite.config.js`.
- Form also stores to `localStorage` as fallback.

### Configure real backend (EmailJS / Firebase)

See `.env.example` and inline comments in `src/components/RegisterForm.jsx`. Provide your keys and replace the `fetch('/api/register')` call with EmailJS or Firebase SDK calls.

### Testing

```bash
npm run test
```

Includes a basic Register form test with React Testing Library and Vitest.

### Theming

Edit `src/theme.json` to swap palette. Tailwind utilities leverage the tokens; update Tailwind if you add new tokens.

### Mission brief panel

- Component lives at `src/components/AboutHeist.jsx` with supporting styles in `src/components/AboutHeist.module.css` and helper `src/hooks/useParallax.js`. Import it anywhere via `import AboutHeist from './components/AboutHeist'`.
- The inline SVG blueprint source is stored at `src/assets/svg/vault-blueprint.svg`. Update that file then restart Vite (or re-run `npm run dev`) to pick up the asset.
- Laser/scan timing comes from the `laserSweep` keyframes in `AboutHeist.module.css`. Adjust the `animation-duration` on `.laser` and `.laserFast` to speed up/slow down the sweep or edit the keyframes for longer delays.
- Animations automatically respect `prefers-reduced-motion`. To force-disable them regardless of OS settings, change the `prefersReducedMotion` constant in `AboutHeist.jsx` to `true` or guard the animated branches with your own flag.
- Tooltips, metadata chips, and parallax intensity are easy to tweak: edit `metadata`, `blueprintNodes`, or the `maxOffset` passed to `useParallax` within `AboutHeist.jsx`.

### Deploy

See `DEPLOY.md` for one‑click Vercel steps.

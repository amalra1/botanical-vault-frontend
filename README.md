# Botanical Vault Frontend

Web app for **Acervo de Plantas**, a private library of transparent plant PNGs used in architectural collages. It talks to [botanical-vault-backend](https://github.com/amalra1/botanical-vault-backend).

## Tech Stack

- **Next.js 16** (App Router, standalone output) + **React 19**
- **TypeScript 5**
- **CSS Modules** + global design tokens (`src/styles/tokens.css`)
- **Axios**, **React Hook Form** + **Zod**
- **Hosting**: Google Cloud Run (`us-east1`)

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

The app runs on http://localhost:3000 and expects the API on `NEXT_PUBLIC_API_URL` (default `http://localhost:8080`).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (`.next/standalone`) |
| `npm run lint` | ESLint with zero warnings allowed |
| `npm run typecheck` | Generates Next route types and runs `tsc --noEmit` |
| `npm run format` / `format:check` | Prettier write / check on `src` |

## Docker

```bash
docker build --build-arg _NEXT_PUBLIC_API_URL=http://localhost:8080 -t botanical-vault-frontend .
docker run -p 3000:3000 botanical-vault-frontend
```

`NEXT_PUBLIC_API_URL` is inlined at build time, so the API URL is a build argument, not a runtime variable.

## Deploy

Every push to `main` triggers Cloud Build (`cloudbuild.yaml`): build, push to Artifact Registry (`us-east1`, repository `botanical-vault`) and deploy to Cloud Run with `min-instances 0` and `max-instances 1`. There is only one environment: production.

The Cloud Build trigger must set the `_API_URL` substitution to the backend's Cloud Run URL. The Artifact Registry repository and its cleanup policy are described in the backend README.

## Documentation

- **Conventions and design notes**: `.claude/CLAUDE.md` (local only)
- **Screens**: https://claude.ai/artifact/Li6BVKX6joyN2dqmXxFXLo

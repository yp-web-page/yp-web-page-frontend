# Yanca Publicidad — Web Site

Public-facing site for Yanca Publicidad. Customers can browse the product catalog, request quotes, and manage their accounts.

## Stack

React 19 + Vite + TypeScript + Tailwind CSS v4 + React Router v7 + TanStack Query v5 + Axios.

## Backends

The site talks to two APIs:

| Variable | Points to | Used for |
|---|---|---|
| `VITE_REACT_APP_BASE_URL` | Legacy Java backend | Auth, user management, quotations, email |
| `VITE_REACT_APP_ERP_BASE_URL` | ERP storefront REST | Product catalog, categories, hero banners |

Environment files are committed: `.env.development` for local dev, `.env.production` for production builds.

## Local setup

Requirements:

- Node ≥ 18

### One-command startup (macOS and Linux)

```bash
make front
```

Installs dependencies and starts the Vite dev server at http://localhost:5173.

> **Windows:** run `npm install && npm run dev` from PowerShell.

### Available `make` commands

| Command | What it does |
|---|---|
| `make front` | Install deps and start the dev server |
| `make dev` | Start the Vite dev server (deps must already be installed) |
| `make build` | Production build |
| `make preview` | Preview the production build at http://localhost:4173 |
| `make lint` | Lint the source code |
| `make test` | Run contract tests |

### Manual setup (without `make`)

```bash
npm install
npm run dev
```

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero, featured products, services, process |
| `/inventarios` | Product catalog |
| `/inventario/:id` | Category detail with product list |
| `/producto/:id` | Product detail |
| `/search` | Search results |
| `/cotizaciones` | My quotations (requires login) |
| `/perfil` | User profile (requires login) |
| `/quienes-somos` | About us |
| `/contactanos` | Contact |
| `/politicas-privacidad` | Privacy policy |
| `/aviso-legal` | Legal notice |

## Project structure

```
src/
├── api/          # Axios clients and mappers (legacy backend + ERP storefront)
├── components/   # Reusable UI components
├── context/      # Auth, modal and error boundary contexts
├── hooks/        # Custom React Query hooks
├── pages/        # Page components
├── routes/       # React Router configuration
├── services/     # API call functions
├── types/        # TypeScript types
└── util/         # Utility functions

tests/
└── contract/     # Contract tests for the ERP storefront API mapping
```

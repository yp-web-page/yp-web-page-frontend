# ADR-0001: Consume the catalog from the ERP (hybrid backend + anti-corruption layer)

- **Status:** Accepted
- **Date:** 2026-05-28

## Context

This site was originally served entirely by the legacy Spring backend (`wpb`,
`https://yancapublicidad.duckdns.org/api/v1`). The company is migrating to a new
ERP, which now exposes a public, anonymous **storefront API** at
`/api/storefront/v1/*` for the catalog (categories, products, public images).
The remaining domains (auth, customers, quotations, email, carousel, wholesale
price tiers) are not built in the ERP yet.

Two facts shaped how we wire the frontend:

1. **The backends have diverged.** Products and categories are now created
   directly in the ERP, so we must **not** assume shared ids between the ERP and
   `wpb`. The catalog has a single source of truth — the ERP.
2. **The ERP API was renamed on purpose.** `inventories`/`lists` became
   `categories`, pagination is a compact `{ items, page, size, total,
   totalPages }` envelope, images are `imageUrl`, and `price` is a number. Our
   existing types follow the old `wpb` shapes.

## Decision

### 1. Hybrid backends (strangler-fig), catalog-first

The **catalog (products + categories) is consumed from the ERP** storefront API.
Everything still missing in the ERP (auth, user, quotation, email, carousel,
wholesale prices) **keeps calling `wpb`**. The app talks to both backends during
the transition; domains move to the ERP one at a time.

### 2. Anti-corruption layer in the catalog services

Instead of changing our types/components to the ERP's shapes, the three catalog
services call the ERP and **map its responses back to the existing types**.
Components and hooks are untouched.

- `src/api/erpClient.ts` — a second axios instance pointed at the ERP storefront
  (`config.erpBaseURL`, no `Authorization` header; the catalog is anonymous).
- `src/api/erpMappers.ts` — the mapping: `toSpringPage` rebuilds the legacy
  Spring `Page` envelope our `ProductList` reads; field translations
  `imageUrl→imagePath`, `children→lists`, `categoryId←listId`,
  `personalizable←printPersonalizable`, `price` number→string.
- `services/inventoryService`, `listService`, `productService` now call
  `erpClient`. Endpoint mapping:
  - `/inventories/all/info` → `GET /categories`
  - `/inventories/favorite/info` → `GET /categories?featured=true`
  - `/inventories/:id` → `GET /categories/:id`
  - `/lists/:id` → `GET /categories/:id/products`
  - `/products/featured` · `/products/search/name` · `/products/filter` →
    consolidated `GET /products?featured=&q=&categoryId=&…`
  - `/products/:id` → `GET /products/:id`

The default `apiClient` (JWT + `wpb` base) stays for every non-catalog service.
`config.ts` exposes both base URLs; the ERP base comes from
`VITE_REACT_APP_ERP_BASE_URL` (default `https://odoo.yprint.co/api/storefront/v1`).

### 3. Prices and in-app quotation are hidden for now

Wholesale tiered pricing (`/products/prices`) and quotations are authenticated,
mutually coupled (a product's print-method ids must match what pricing/quotation
expect), and not yet in the ERP. Until they are:

- Product **prices** are hidden (`ProductColorsPriceCard`, `ProductView`,
  `Inventory` cards).
- **In-app quotation entry points** are hidden (the "Añadir a cotización"
  button, the "Mis cotizaciones" nav). WhatsApp remains the contact CTA.
- `productService.getProductPrices` stays wired to `wpb` but is not invoked.

Anonymous browsing — the bulk of the site — works fully from the ERP.

### 4. LF line endings

Added `.gitattributes` (`* text=auto eol=lf` + binary rules) to stop the
whole-tree CRLF/LF churn from Windows checkouts, so `git status` is accurate and
diffs stay scoped.

## Consequences

### Positive

- Tiny migration footprint: 3 services + 1 client + 1 mapper module + an env
  var. No component/hook changes for the data path.
- The catalog is sourced entirely from the ERP, so ERP-only products show up
  with no `wpb` dependency.
- The anti-corruption layer absorbs the ERP renames; the cleaner ERP contract
  isn't held back by our legacy types.

### Negative / costs accepted

- Two backends and two axios clients until `wpb` is retired.
- Wholesale prices and in-app quotations are unavailable on the site in the
  interim (both are authenticated, low-traffic features).
- The mapping layer must track the storefront contract (versioned `/v1`).

## Alternatives considered

- **Full rewrite to the ERP at once** — blocked: auth/customers/quotations/
  email/carousel don't exist in the ERP yet.
- **1:1 compatibility layer (ERP mirrors `wpb` paths/shapes)** — rejected: it
  would carry `wpb`'s wrong names (`inventories` for categories) into the new
  system; the ERP deliberately renamed to the correct domain.
- **Change our types/components to the ERP shapes** — rejected: large blast
  radius across components/hooks/pages for no gain over mapping in 3 services.

## Follow-ups

Re-point the remaining services to the ERP and re-enable prices + quotation once
the ERP exposes auth, customers, pricing and quotations. Tracked in the ERP repo:
`Alexander940/erp#85`. When the cutover completes, remove `apiClient` and the
`wpb` base URL.

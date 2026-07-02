# Mapa del repo

## Proyecto

- `astro.config.mjs`: configuración de Astro. Tiene `site: 'https://raizinterna.xyz'`, integración `@astrojs/sitemap` (filter+serialize con `lastmod`), plugin Vite de Tailwind, `shikiConfig.theme: 'monokai'`, `build.format: 'file'`.
- `tsconfig.json`: extiende `astro/tsconfigs/strict`, incluye todo salvo `dist/`.
- `package.json`: dependencias para Astro 7, Tailwind 4 + typography, fonts (Cormorant Garamond, Playfair Display, Lora, Work Sans), `sharp`, `@astrojs/rss`, `@astrojs/sitemap`, `@astrojs/mdx`. DevDeps: `@astrojs/check`, `typescript`, `@tailwindcss/typography`, `@tailwindcss/vite`, `tailwindcss`.
- `pnpm-workspace.yaml`: presente, permite `esbuild` y `sharp`. Sin paquetes workspace declarados.
- `pnpm-lock.yaml`: lockfile de pnpm.
- `opencode.json`: configuración de opencode con MCP servers (`hcti` para generar OG images, `stitch` para diseño).
- `public/`: assets estáticos servidos tal cual. Contiene favicon (16/32/180 + SVG + ICO generados desde `logo.jpeg` con `scripts/generate-favicon.mjs`), `robots.txt`, `_headers` (cache + security para Cloudflare Pages), `images/autor.jpg` (foto del autor, 600x600, 41KB) y `og/` con OG images (`home`, `autor`, `memorias` — placeholders en MVP).
- `node_modules/`: dependencias instaladas. No trackeado.
- `.git/`, `.gitignore`, `.vscode/`: control de versiones y editor.

## Código fuente

- `src/pages/`: rutas file-based de Astro.
  - `index.astro`: home = feed de memorias (hero + lista + JSON-LD `WebSite`).
  - `autor.astro`: bio corta del autor con JSON-LD `Person`.
  - `memorias/[slug].astro`: memoria individual con JSON-LD `BlogPosting` y back link al home.
  - `feed.xml.ts`: endpoint RSS con las 10 memorias más recientes.
  - `404.astro`: página no encontrada.
- `src/layouts/`:
  - `BaseLayout.astro`: layout principal. Slots: `content` (en body), `head` y `json-ld` (en head). Props: title, description, ogImage, ogImageAlt?, ogType?, canonical?. Preload de 5 woff2 locales (Lora, Playfair Display, Cormorant Garamond, Work Sans) para LCP rápido.
- `src/components/`: `Nav.astro` y `Footer.astro` (compartidos vía `BaseLayout.astro`). Los starter `Welcome.astro` y `Layout.astro` quedan como archivos huérfanos del starter de Astro, no se borran sin pedir.
- `src/assets/`: assets procesados por Astro (imágenes, fuentes si se opta por esa vía). Vacío en MVP; los placeholders de OG van en `public/og/`.
- `src/content/`:
  - `memorias/`: contiene las memorias en `.md` (o `.mdx` cuando se use). Filename libre; el `slug` viene del frontmatter. Ejemplo: `bienvenida.md`.
- `src/utils/`:
  - `posts.ts`: helpers `getPublishedMemorias()` (filtra drafts, ordena desc), `postUrl(post)` (`/memorias/:slug`) y `getMetadataLabel(post)` (formatea series/categoría).
  - `reading.ts`: `readingTimeMinutes(body)` (cuenta palabras en markdown, divide por 200 WPM Spanish) y `readingTimeISO(min)` (formato ISO 8601 `PT<M>M` para JSON-LD `timeRequired`).
- `src/styles/`:
  - `global.css`: Tailwind 4 + fonts + typography. Override de `font-family` body → Lora, headings → Playfair Display.
- `src/content.config.ts`: define la collection `memorias` con su schema Zod.
- `scripts/generate-og-placeholders.mjs`: script que regenera los placeholders de las OG images (1200×630 PNG) con `sharp`. Invocable con `pnpm og:placeholders`. Sustituir con el generador definitivo (HCTI, Figma, etc.) cuando estén listas las imágenes finales.

## Docs progresivos

- `.docs/README.md`: índice y punto de partida.
- `.docs/project-context.md`: propósito del proyecto, audiencia y estado.
- `.docs/stack-and-workflow.md`: stack, comandos y flujo de desarrollo.
- `.docs/repo-map.md`: este archivo — dónde encontrar las cosas.
- `.docs/architecture.md`: convenciones de Astro aplicables al proyecto.
- `.docs/content-and-i18n.md`: idioma, schemas, RSS, sitemap.
- `.docs/seo-checklist.md`: SEO completo (meta tags, JSON-LD, OG, RSS, sitemap, paginación, URLs, prácticas).
- `.docs/design-system.md`: tokens de diseño (colores, tipografía, espaciado, forma, componentes).
- `.docs/deployment.md`: target de deploy y pasos pendientes.
- `.docs/product-and-design-references.md`: origen del diseño (Stitch) y mapeo de componentes.

## MCP servers disponibles

Definidos en `opencode.json`:

- `hcti` (https://mcp.hcti.io) — HTML/CSS to Image. Útil para generar las OG images finales.
- `stitch` (https://stitch.googleapis.com/mcp) — Google Stitch, donde vive el design system del proyecto (`projects/8094559307907069471`).

## Starter files pendientes de limpieza

Estos archivos vinieron con `pnpm create astro@latest` y no se usan en el blog real. Quedan en disco pero no se referencian desde ningún lugar:

- `src/components/Welcome.astro` (starter)
- `src/layouts/Layout.astro` (starter — distinto del `BaseLayout.astro` real)
- `src/assets/astro.svg`, `src/assets/background.svg` (starter)

**No borrar sin pedir** (regla del repo). Si querés limpiarlos, confirmar antes.

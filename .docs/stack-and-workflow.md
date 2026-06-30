# Stack y flujo de trabajo

## Stack

- **Runtime**: Node.js >= 22.12.0 (declarado en `package.json`).
- **Framework**: [Astro](https://astro.build) `^7.0.3`.
- **Lenguaje**: TypeScript en modo strict (`astro/tsconfigs/strict`).
- **CSS**: [Tailwind CSS v4](https://tailwindcss.com/) vía plugin `@tailwindcss/vite`, con `@tailwindcss/typography` para el contenido markdown.
- **Package manager**: pnpm, con `pnpm-workspace.yaml` presente (permite `esbuild` y `sharp`).
- **SEO**: `@astrojs/sitemap` para sitemap, `@astrojs/rss` para feed.
- **Contenido**: `@astrojs/mdx` (declarado por si se quiere usar `.mdx` en el futuro).
- **Tipografías**: `@fontsource/cormorant-garamond` (logo, 300), `@fontsource/playfair-display` (headings, 400), `@fontsource/lora` (body, 400 + 400-italic), `@fontsource/work-sans` (metadata, 400).
- **Imágenes**: `sharp` para procesamiento y optimización.

## Comandos

- Setup: `pnpm install`
- Desarrollo: `pnpm dev` (en background: `astro dev --background`; administrar con `astro dev stop|status|logs`)
- Build: `pnpm build` (genera `./dist/`)
- Preview: `pnpm preview`
- CLI de Astro: `pnpm astro <comando>` (ej. `pnpm astro add mdx`, `pnpm astro check`)
- Tests: no hay test runner configurado.
- Lint / formateador: no hay linter ni formateador configurado.
- Seguridad / calidad: `pnpm astro check` (type-check).

## Configuración de Astro

`astro.config.mjs`:

- `site: 'https://raizinterna.xyz'` — dominio oficial. El subdominio `raizinterna.resagar.com` queda como alias para uso desde `resagar.com`.
- `integrations: [sitemap({...})]` — `@astrojs/sitemap` con `filter` (excluye `/404`) y `serialize` (asigna `priority` y `changefreq` por URL).
- `vite.plugins: [tailwindcss()]` — plugin de Tailwind 4.
- `markdown.shikiConfig: { theme: 'monokai' }` — syntax highlighting.
- `build.format: 'file'` — cada ruta genera un archivo HTML (ej. `dist/memorias/:slug.html`). La URL canónica se construye sin la extensión.

## Estructura del build (con `format: 'file'`)

```
dist/
├── index.html                          (home = feed de memorias)
├── autor.html
├── memorias/<slug>.html                (uno por memoria)
├── feed.xml
├── sitemap-index.xml
├── sitemap-0.xml
├── robots.txt                          (copiado desde public/)
├── _headers                            (copiado desde public/, cache + security)
├── 404.html
├── favicon-16x16.png, favicon-32x32.png, favicon.ico, favicon.svg, apple-touch-icon.png
├── images/autor.jpg
└── og/{home,autor,memorias}.png        (copiados desde public/, 1200×630)
```

## Notas de flujo

- **Sin CI**: no hay workflows de GitHub Actions ni pipeline de build.
- **Sin remoto git**: el repo no tiene `origin` configurado. Push se configurará cuando se decida el host.
- **Sin pre-commit hooks**.
- **Sin DaisyUI**: a pesar de que `resagar` lo usa, el sistema de diseño de Stitch (este blog) define "Flat & Layerless" — sin cards con sombras, sin elevación, sin temas.
- El dev server de Astro en background es una feature propia de este repo (mencionada en `AGENTS.md`); no viene por defecto con `astro dev`. Se invoca con el flag `--background`.

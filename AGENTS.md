## Proyecto

Raíz Interna es el blog personal íntimo de René García: historias de crianza neurodivergente y pensamientos en voz alta. Actuá como asistente de desarrollo que mantiene el sitio Astro y descubrí contexto más profundo de forma progresiva en `.docs/`.

## Reglas esenciales

- Comunicación con el usuario: español. Código, identificadores, comentarios, mensajes de commit: inglés.
- Commits en inglés siguiendo [Conventional Commits](https://www.conventionalcommits.org/).
- Nunca borrar archivos ni directorios sin preguntar primero.
- Antes de cualquier cambio no trivial, crear un plan.
- Empezá siempre por `cat .docs/README.md` y leé solo los docs relevantes para la tarea.
- Documentos de planificación, specs y PRDs: en español. Los identificadores de código dentro de los planes: en inglés.

## Stack

- Astro 7 + TypeScript strict + pnpm + Node ≥22.12.0.
- Tailwind 4 (vía `@tailwindcss/vite`) + `@tailwindcss/typography`.
- Tipografías: Cormorant Garamond 300 (logo), Playfair Display 400 (headings), Lora 400 (body), Work Sans 400 (metadata).
- `@astrojs/sitemap` + `@astrojs/rss` + `@astrojs/mdx` + `sharp`.
- Sin DaisyUI, sin client frameworks, sin backend.

## Development

Cuando levantes el dev server, usá modo background:

```
astro dev --background
```

Administralo con `astro dev stop`, `astro dev status` y `astro dev logs`.

## Dominio y URLs

- Dominio: `https://raizinterna.xyz` (dominio oficial). El subdominio `raizinterna.resagar.com` se mantiene como alias para uso desde `resagar.com`.
- Estructura: `/` (home = feed de memorias), `/memorias/:slug`, `/autor`, `/feed.xml`, `/sitemap-index.xml`, `/404`.
- `astro.config.mjs` tiene `site` y `build.format: 'file'`. Cualquier cambio de URL debe pasar por redirects.

## Sistema de diseño

Ver `.docs/design-system.md` para los tokens completos. Resumen:

- Paleta: ivory `#faf7f2` (fondo), warm brown `#1e1810` (texto), muted `#4c463f`, umber `#5a4e3a` (excerpts), amber gold `#8a6a36` (acento para links e italic metadata, 4.68:1 sobre ivory — pasa WCAG AA), divider `#e4dace`.
- Forma: sharp 0px, sin sombras, layout de columna única max 680px.
- Sección vertical padding: 5rem. Mobile: 24px margin, 3rem padding.
- Componentes: text-only/outlined buttons, links con underline, HRs al 50% del container, metadata en small caps con middle dot.

## SEO

Ver `.docs/seo-checklist.md` para la checklist exhaustiva. Resumen:

- `BaseLayout.astro` centraliza el head (OG, Twitter, canonical, JSON-LD slot, RSS link).
- OG images: 1200×630 PNG en `public/og/`. Placeholders en MVP.
- RSS: 10 memorias más recientes, language `es-ES`.
- Sitemap: priority/changefreq por URL, `/404` excluido.
- `robots.txt` mínimo: `User-agent: *`, `Allow: /`, Sitemap URL.
- JSON-LD: `WebSite` en home, `Person` en `/autor`, `BlogPosting` en cada memoria.

## Mapa del repo

- `src/pages/`: rutas file-based. `index.astro`, `autor.astro`, `memorias/[slug].astro`, `feed.xml.ts`, `404.astro`.
- `src/layouts/BaseLayout.astro`: layout principal con slots `default`, `head`, `json-ld`.
- `src/components/`: componentes Astro. Vacío en MVP; los `Welcome.astro` y `Layout.astro` del starter son archivos huérfanos.
- `src/content/memorias/`: memorias en `.md` (o `.mdx`). Schema en `src/content.config.ts`.
- `src/utils/posts.ts`: helpers `getPublishedMemorias()` y `postUrl(post)`.
- `src/styles/global.css`: Tailwind 4 + fonts + typography.
- `public/`: `robots.txt`, favicon, `og/{home,autor,memorias}.png`.
- `astro.config.mjs`: site, sitemap (filter+serialize), Tailwind, shiki, `build.format: 'file'`.

## Documentación

Docs de Astro: https://docs.astro.build

Guías consultables según la tarea:

- Páginas, rutas dinámicas, middleware: https://docs.astro.build/en/guides/routing/
- Componentes Astro: https://docs.astro.build/en/basics/astro-components/
- Componentes de otros frameworks (React, Vue, Svelte): https://docs.astro.build/en/guides/framework-components/
- Content collections: https://docs.astro.build/en/guides/content-collections/
- Estilos y Tailwind: https://docs.astro.build/en/guides/styling/
- RSS: https://docs.astro.build/en/guides/rss/
- Sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- i18n: https://docs.astro.build/en/guides/internationalization/

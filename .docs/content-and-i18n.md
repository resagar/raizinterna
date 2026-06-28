# Contenido e i18n

## Idioma

- Todo el contenido del blog es en **español**.
- `<html lang="es">` en el layout base.
- `og:locale` es `es_ES`.
- Sin plan declarado de i18n / multi-idioma. Si se agrega en el futuro, revisar la guía: https://docs.astro.build/en/guides/internationalization/

## Secciones de contenido

- **Artículos** (content collection `memorias` en `src/content/memorias/`):
  - Listado en `/` (home = feed de memorias, orden cronológico inverso).
  - Cada memoria se publica en `/memorias/:slug` (sin prefijo de fecha).
  - Filename libre; el `slug` se define explícitamente en el frontmatter.
  - **No hay paginación en MVP**. Si en el futuro se quiere, va a `/memorias/2`+ con `noindex, follow` y canonical a `/`.
- **Páginas estáticas** (no son content collection en MVP):
  - `/autor` — bio corta. Por ahora vive en `src/pages/autor.astro` directamente. Si se vuelve más compleja (multi-página de autor), mover a una collection `pages` igual que en `resagar`.

## Schema de la collection `memorias`

Definido en `src/content.config.ts`:

```ts
memorias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memorias' }),
  schema: z.object({
    title: z.string(),                              // requerido
    slug: z.string(),                               // requerido — forma parte de la URL
    summary: z.string().optional(),                 // usado en listados, OG description y RSS description
    publishedAt: z.coerce.date(),                   // requerido — define orden en el feed
    category: z.string().default('crianza'),        // usado en RSS como <category>
    published: z.boolean().default(true),           // filtrado en getPublishedMemorias()
    tags: z.array(z.string()).default([]),          // metadata y JSON-LD keywords
    ogImage: z.string().optional(),                 // fallback a '/og/memorias.png'
  }),
});
```

**Defaults útiles**: `publishedAt` se puede extraer del filename si se usa `YYYY-MM-DD-slug.md`, pero la fecha debe estar **explícita en el frontmatter** para que el orden sea estable.

## Helpers de memorias

`src/utils/memorias.ts` (o `posts.ts` si se prefiere el nombre de `resagar`):

- `getPublishedMemorias()` — `getCollection('memorias')`, filtra `published !== false`, ordena desc por `publishedAt`.
- `memoriaUrl(memoria)` — `return '/memorias/' + memoria.data.slug`.

`resagar` usa `posts.ts` y `postUrl(post)`. Acá seguimos el patrón (mismo nombre) para mantener consistencia entre los dos proyectos, pero los nombres semánticos podrían ser `memorias.ts` y `memoriaUrl()`. **Decisión**: usar `posts.ts` y `postUrl()` por consistencia con `resagar`. Si en el futuro hace ruido, renombrar en una sola migración.

## RSS feed

- URL: `https://raizinterna.resagar.com/feed.xml`.
- Generado por `src/pages/feed.xml.ts` con `@astrojs/rss`.
- Lista los **10 memorias más recientes** publicadas.
- Metadata: `title: "Raíz Interna"`, `description: <tagline>`, `language: 'es-ES'`, `managingEditor` y `webMaster` con René García, autor `rsamuelgarcia@gmail.com (René Garcia)`.
- Cada item: `title`, `pubDate`, `description`, `link` (URL absoluta), `categories: [categoria]`, `author`.
- `BaseLayout.astro` enlaza el feed con `<link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Raíz Interna">`. La nav debe tener un botón que apunte a `/feed.xml`.

## Sitemap

- Generado por `@astrojs/sitemap` en build.
- Salida: `dist/sitemap-index.xml` (índice) + `dist/sitemap-0.xml` (URLs).
- `public/robots.txt` referencia `https://raizinterna.resagar.com/sitemap-0.xml`.
- **Incluye**:
  - `/` (priority 1.0, changefreq weekly o daily según frecuencia de publicación)
  - `/autor` (priority 0.5, changefreq monthly)
  - cada `/memorias/:slug` (priority 0.8, changefreq monthly)
- **Excluye**: `/404` (filter explícito), páginas de paginación 2+ (cuando se agreguen).
- Filter y serialize configurados en `astro.config.mjs`.

## 404

- `src/pages/404.astro` con `BaseLayout`, mensaje corto y link al home.
- Astro sirve automáticamente esta página para URLs inexistentes.
- Nav y footer siguen disponibles en el 404.

## SEO / meta tags

Ver [`.docs/seo-checklist.md`](./seo-checklist.md) — el detalle completo de qué va en el head, JSON-LD por página, OG images, etc.

Resumen rápido:

- `<title>` y `<meta name="description">` por página (props de `BaseLayout`).
- Open Graph completo (8 tags) y Twitter card (5 tags).
- Canonical URL.
- Slot `json-ld` para Schema.org: `WebSite` en home, `Person` en `/autor`, `BlogPosting` en cada memoria.
- Slot `head` para meta adicionales (futuro: `noindex, follow` en paginación 2+).
- Para memorias sin `ogImage`, fallback a `/og/memorias.png`.

## Out of scope (MVP)

- Tags page navegable.
- Categorías navegables (página `/categoria/:slug`).
- Sistema de comentarios.
- Newsletter.
- Búsqueda.
- Paginación (se agrega si la lista crece lo suficiente).
- Internacionalización.

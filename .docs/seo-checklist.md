# SEO Checklist

Esta es la checklist exhaustiva de SEO que el blog implementa. La fuente original es el setup de [`resagar`](https://github.com/resagar/resagar), adaptado al dominio `raizinterna.xyz` y a la estructura de URLs `/memorias/:slug`.

> Cada bloque explica **qué** va, **dónde** va, y **por qué** se hace así. Si en el futuro agregás una nueva página, tenés que cubrir todos los bloques que correspondan.

---

## 1. BaseLayout (`<head>` completo)

El `BaseLayout.astro` (`src/layouts/BaseLayout.astro`) es el único lugar donde se centraliza el head. Las páginas pasan `title`, `description`, `ogImage`, `ogImageAlt`, `ogType` y `canonical` como props. Slots: `default` (contenido), `head` (meta adicionales), `json-ld` (Schema.org).

### Tags obligatorias

```astro
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="theme-color" content="#faf7f2" />  <!-- ivory, matchea el fondo -->
```

### Title y description

```astro
<title>{title}</title>
<meta name="description" content={description} />
```

### Open Graph (8 tags)

```astro
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageURL} />            <!-- URL absoluta -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={ogImageAlt} />        <!-- siempre presente -->
<meta property="og:url" content={canonicalURL} />             <!-- canónica -->
<meta property="og:type" content={ogType} />                  <!-- 'website' o 'article' -->
<meta property="og:site_name" content="Raíz Interna" />
<meta property="og:locale" content="es_ES" />
```

### Twitter card (5 tags)

```astro
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@rsamuelgarcia" />
<meta name="twitter:creator" content="@rsamuelgarcia" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageURL} />
```

### Canonical

```astro
<link rel="canonical" href={canonicalURL} />
```

`canonicalURL` se calcula con `new URL(canonical ?? defaultCanonical, Astro.site)`. Si no se pasa `canonical`, se usa el `pathname` actual (con trailing slash removido).

### RSS discovery

```astro
<link rel="alternate" type="application/rss+xml" title="Raíz Interna" href="/feed.xml" />
```

### Favicon

```astro
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="icon" href="/icon.png" type="image/png" />
<link rel="apple-touch-icon" href="/icon.png" />
```

### Slots

- `head` — para meta adicionales por página (ej. `<meta name="robots" content="noindex, follow">` en paginación 2+, `<link rel="prev">` / `<link rel="next">`).
- `json-ld` — para Schema.org (ver bloque 2).

---

## 2. JSON-LD (Schema.org por página)

Cada página incluye un `<script type="application/ld+json">` con su schema correspondiente. Se inyecta vía el slot `json-ld` de `BaseLayout`.

### Home `/` — `WebSite`

```ts
{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Raíz Interna',
  url: 'https://raizinterna.xyz',
  description: '<tagline>',
  inLanguage: 'es',
  author: { '@id': 'https://raizinterna.xyz/autor#person' }
}
```

### `/autor` — `Person`

```ts
{
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://raizinterna.xyz/autor#person',  // el home apunta a este @id
  name: 'René García',
  jobTitle: 'Padre, escritor, neurodivergente',
  url: 'https://raizinterna.xyz/autor',
  description: '<bio corta>',
  inLanguage: 'es',
  sameAs: [
    'https://x.com/rsamuelgarcia',
    'https://github.com/resagar',
    'https://www.linkedin.com/in/...',
    'https://resagar.com'  // link a su blog profesional
  ],
  knowsAbout: [
    'Crianza',
    'Parenting',
    'TDAH (Trastorno por Déficit de Atención e Hiperactividad)',
    'AACC (Altas Capacidades)',
    'Escritura',
    'Software Development'
  ]
}
```

### `/memorias/:slug` — `BlogPosting`

```ts
{
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.data.title,
  description: post.data.summary ?? post.data.title,
  datePublished: post.data.publishedAt.toISOString(),
  dateModified: post.data.publishedAt.toISOString(),  // por ahora = datePublished
  url: 'https://raizinterna.xyz/memorias/' + post.data.slug,
  inLanguage: 'es',
  author:   { '@id': 'https://raizinterna.xyz/autor#person' },
  publisher:{ '@id': 'https://raizinterna.xyz/autor#person' },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://raizinterna.xyz/memorias/' + post.data.slug
  },
  image: ogImageURL,
  ...(post.data.tags.length > 0 ? { keywords: post.data.tags.join(', ') } : {})
}
```

**Regla de oro**: el `author` y `publisher` siempre referencian al `@id` del `Person` de `/autor`. Esto conecta las entidades en el grafo de Schema.org.

---

## 3. OG images

### Formato

- **Dimensiones**: 1200×630 (estándar para Open Graph).
- **Formato**: PNG (placeholder inicial; después se puede convertir a WebP/JPG si se quiere).
- **Tamaño**: idealmente < 200KB para que las redes sociales las cacheen rápido.

### Ubicación

- Estáticos en `public/og/`:
  - `home.png` — default para `/`
  - `autor.png` — default para `/autor`
  - `memorias.png` — default para memorias
- Una memoria individual puede sobrescribir el default con `ogImage` en el frontmatter (URL relativa a la raíz del sitio, ej. `/og/mi-memoria-especial.png`).

### Alt text (obligatorio)

- `ogImageAlt` siempre presente.
- Contextual al contenido:
  - Home: `"Raíz Interna — memorias de criar y pensar en voz alta"`.
  - `/autor`: `"René García — padre, escritor, neurodivergente"`.
  - Memoria: `"Imagen de la memoria: <título>"`.

### Generación

- **En MVP son placeholders**. Después se pueden generar:
  - Con el MCP de **HCTI** (ya configurado en `opencode.json`) — generando HTML + screenshot.
  - Con Figma / Stitch / Canva — diseño manual.
  - Con un script Node que use `satori` + `sharp` para generarlos en build (avanzado; no implementado en MVP).

### Renderizado

`BaseLayout` convierte la ruta relativa a absoluta con:

```ts
const ogImageURL = new URL(ogImage, Astro.site).toString();
```

---

## 4. RSS

Endpoint: `/feed.xml` vía `src/pages/feed.xml.ts` con `@astrojs/rss`.

```ts
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedMemorias, memoriaUrl } from '../utils/posts';

export async function GET(context: APIContext) {
  const memorias = (await getPublishedMemorias()).slice(0, 10);

  return rss({
    title: 'Raíz Interna',
    description: '<tagline>',
    site: context.site!,
    language: 'es-ES',
    customData:
      '<managingEditor>rsamuelgarcia@gmail.com (René Garcia)</managingEditor>' +
      '<webMaster>rsamuelgarcia@gmail.com (René Garcia)</webMaster>',
    items: memorias.map((m) => ({
      title: m.data.title,
      pubDate: m.data.publishedAt,
      description: m.data.summary ?? '',
      link: new URL(memoriaUrl(m), context.site).toString(),
      categories: [m.data.category],
      author: 'rsamuelgarcia@gmail.com (René Garcia)',
    })),
    stylesheet: false,
  });
}
```

### Reglas

- Máximo 10 items (los más recientes).
- `language: 'es-ES'` (español de España, no `es` genérico — matchea `og:locale`).
- `managingEditor` y `webMaster` con el formato `"email (nombre)"` (RFC-2822 style).
- `link` siempre URL absoluta (no relativa).

---

## 5. Sitemap

Generado por `@astrojs/sitemap` en `astro.config.mjs`:

```js
sitemap({
  filter: (page) => !page.includes('/404'),
  serialize: (item) => {
    const url = item.url.replace(/\/$/, '') || '/';
    const normalized = { ...item, url };
    if (url === 'https://raizinterna.xyz') {
      return { ...normalized, priority: 1.0, changefreq: 'weekly' };
    }
    if (url === 'https://raizinterna.xyz/autor') {
      return { ...normalized, priority: 0.5, changefreq: 'monthly' };
    }
    if (/^https:\/\/raizinterna\.resagar\.com\/memorias\/[^/]+$/.test(url)) {
      return { ...normalized, priority: 0.8, changefreq: 'monthly' };
    }
    return normalized;
  },
});
```

### Reglas

- Output: `dist/sitemap-index.xml` + `dist/sitemap-0.xml`.
- `public/robots.txt` referencia `https://raizinterna.xyz/sitemap-0.xml`.
- `/404` se excluye explícitamente con `filter`.
- Páginas de paginación 2+ (cuando se agreguen) también se excluyen y reciben `noindex, follow`.
- Priority y changefreq son **sugerencias** para crawlers; Google las ignora, pero Bing y otros las usan.

---

## 6. robots.txt

`public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://raizinterna.xyz/sitemap-0.xml
```

Mínimo, suficiente. No se bloquea nada en MVP (sin admin, sin áreas privadas).

---

## 7. Paginación (futuro)

Cuando la lista de memorias crezca, se puede paginar:

- `/memorias/2`+ con:
  - `<meta name="robots" content="noindex, follow">` en el slot `head` de `BaseLayout`.
  - `<link rel="canonical" href="https://raizinterna.xyz/">` apuntando al home.
  - `<link rel="prev">` / `<link rel="next">` con las URLs de las páginas adyacentes.
- Excluir del sitemap con `filter` en `astro.config.mjs`.

El home actual (`/`) no tiene paginación: muestra todas las memorias. Si en el futuro se quiere mantener el home como feed, una opción es implementar scroll infinito con un `load more` client-side.

---

## 8. URLs

### Formato actual

- `/` — home.
- `/autor` — bio.
- `/memorias/:slug` — memoria individual (slug libre, viene del frontmatter).
- `/feed.xml` — RSS.
- `/sitemap-index.xml`, `/sitemap-0.xml` — sitemap.
- `/404` — no encontrada.

### Reglas

- **Slugs explícitos en el frontmatter**, no derivados del filename. Esto permite renombrar el archivo `.md` sin romper URLs.
- **No incluir fecha en la URL**. A diferencia de `resagar` (que usa `/YYYY/MM/slug` por compatibilidad con su versión Rails), Raíz Interna es un blog íntimo: la fecha no aporta SEO significativo, hace las URLs más largas, y mete ruido cronológico donde no hace falta.
- **`build.format: 'directory'`** — cada ruta genera un directorio. `/memorias/foo` → `dist/memorias/foo/index.html`. Esto se siente nativo y no requiere trailing slash.
- **Si en el futuro se cambia la estructura**, configurar redirects en `astro.config.mjs` con `redirects: { ... }` para no perder backlinks.

---

## 9. Prácticas generales

- `lang="es"` en `<html>` (siempre).
- `og:locale="es_ES"` en OG (siempre).
- **Alt text obligatorio** en OG image (mejora accesibilidad y SEO en redes).
- Canonical **absoluto** (nunca relativo).
- Imágenes inline con `loading="lazy"` y `decoding="async"` (excepto la imagen LCP del hero, que puede llevar `loading="eager"` y `fetchpriority="high"`).
- `prefers-reduced-motion` respetado en cualquier animación (no hay animaciones obligatorias en el design actual, pero queda documentado).
- 404 con `BaseLayout` (mantiene chrome: nav, footer, links).
- No usar `target="_blank"` sin `rel="noopener noreferrer"`.
- HTTPS siempre (Cloudflare Pages lo fuerza).

---

## 10. Checklist pre-deploy

Antes de hacer deploy, verificar:

- [ ] `astro.config.mjs` tiene `site: 'https://raizinterna.xyz'`.
- [ ] `public/robots.txt` apunta al sitemap correcto.
- [ ] `BaseLayout` está en TODAS las páginas (incluso 404).
- [ ] Cada página pasa `ogImage` + `ogImageAlt` con valores reales.
- [ ] Cada página inyecta su JSON-LD correspondiente en el slot.
- [ ] Las OG images existen en `public/og/` (no son placeholders vacíos si vas a producción).
- [ ] `pnpm build` genera `dist/sitemap-0.xml`, `dist/feed.xml`, `dist/robots.txt`.
- [ ] Las URLs en el sitemap coinciden con las URLs canónicas del sitio.
- [ ] `lang="es"` en `<html>`.
- [ ] No hay errores en `pnpm astro check`.
- [ ] No hay links rotos.

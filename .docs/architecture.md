# Arquitectura

## Forma del sistema

- Sitio estático generado por Astro.
- Sin backend, sin base de datos, sin API propia.
- Sin autenticación, sin áreas privadas, sin comentarios (en MVP).
- Sin newsletter, sin búsqueda, sin analytics (en MVP).

## Routing

Astro usa **file-based routing** dentro de `src/pages/`. Cada archivo `.astro` se convierte en una ruta según su nombre y ubicación:

- `src/pages/index.astro` → `/` (home = feed de memorias)
- `src/pages/autor.astro` → `/autor`
- `src/pages/memorias/[slug].astro` → `/memorias/:slug` (memorias individuales)
- `src/pages/404.astro` → 404 (servido automáticamente por Astro para URLs inexistentes)
- `src/pages/feed.xml.ts` → `/feed.xml` (endpoint RSS)

Con `build.format: 'file'`, cada ruta se renderiza como un archivo HTML individual (ej. `dist/memorias/foo.html`). La URL canónica se construye sin la extensión `.html` en `BaseLayout.astro`.

Más info: https://docs.astro.build/en/guides/routing/

## Layouts y componentes

- `src/layouts/`: layouts que envuelven páginas. Convención: un `BaseLayout.astro` que provee `<html>`, `<head>` y el slot principal; provee slots adicionales (`head`, `json-ld`) para que cada página inyecte lo propio.
- `src/components/`: componentes Astro reutilizables. Sin estado por defecto; pueden ser client islands con directivas `client:*` si se necesita interactividad.
- `src/assets/`: assets procesados y optimizados por Astro (imports que devuelven URLs). Para archivos servidos tal cual usar `public/`.

## Contenido

- **Content collection `memorias`** en `src/content/memorias/` (cargada con `glob` desde `content.config.ts`).
- Markdown nativo de Astro procesa `.md` y `.mdx` (MDX está disponible vía `@astrojs/mdx`).
- `getCollection('memorias')` devuelve todas las entradas; `render(entry)` devuelve `{ Content, headings }` para renderizar el body.

Más info: https://docs.astro.build/en/guides/content-collections/

## Patrones y restricciones

- **`astro.config.mjs` está configurado** con `site`, sitemap, Tailwind, shiki, y `build.format`. Cualquier cambio al routing, integraciones o formato de build debe pasar primero por ese archivo.
- **Sin client framework instalado**. Si en el futuro se necesita interactividad (ej. un menú móvil con toggle), sumar la integración del framework correspondiente (React, Vue, Svelte) o usar vanilla JS dentro de un `<script>`.
- **Sin DaisyUI**: el sistema de diseño es Tailwind puro con tokens custom definidos en `src/styles/global.css` y documentados en `.docs/design-system.md`. No usar clases `btn`, `card`, `navbar` de DaisyUI.
- **Las fuentes de tipografía se importan desde `@fontsource`**, no se cargan desde Google Fonts. Esto evita requests externos y mejora performance.
- **Las OG images son archivos estáticos** en `public/og/`. Cada memoria puede sobrescribir la default vía frontmatter `ogImage`. No hay generación dinámica.

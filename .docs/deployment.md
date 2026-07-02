# Deploy

## Entornos

- **Producción**: `https://raizinterna.xyz` (dominio oficial, registrado en Cloudflare).
- **Alias legacy**: `https://raizinterna.resagar.com` (subdominio de [resagar.com](https://resagar.com), hosteado en Cloudflare Pages). Sigue activo como punto de entrada desde el blog profesional, pero **no** es el canónico — el canonical de cada página apunta a `raizinterna.xyz`.
- **Preview local**: `pnpm preview` sirve el build estático en local.

## Target

- **Cloudflare Pages** (mismo host que resagar.com).
- Build: sitio **estático puro** (`output: 'static'` por default en Astro 7, sin adapter).
- Si en el futuro se quiere SSR (por ejemplo, para endpoints dinámicos), instalar `@astrojs/cloudflare`. Documentación: https://docs.astro.build/en/guides/integrations-guide/cloudflare/

## Configuración en Cloudflare Pages (Git integration)

- **Build command**: `pnpm build`
- **Build directory**: `dist`
- **Environment variables**:
  - `NODE_VERSION=22`
  - (Más adelante, si se suman servicios externos, las claves acá.)

## DNS

- `raizinterna.xyz` es el dominio apex oficial. Configurar en Cloudflare Pages como "Custom domain".
- `raizinterna.resagar.com` es un CNAME legacy dentro de `resagar.com` que apunta al mismo proyecto de Cloudflare Pages. Sirve el mismo contenido; el canonical y JSON-LD siempre apuntan a `raizinterna.xyz`.

## Comandos y sistemas

- Build: `pnpm build` produce `./dist/` con el sitio estático.
- Estructura del output (con `build.format: 'file'`):
  - `dist/index.html` (home)
  - `dist/autor.html`
  - `dist/memorias/<slug>.html` (un archivo por memoria)
  - `dist/404.html`
  - `dist/feed.xml`
  - `dist/sitemap-index.xml` + `dist/sitemap-0.xml`
  - `dist/robots.txt` (copiado desde `public/`)
  - `dist/_headers` (copiado desde `public/`, cache + security headers)
  - `dist/images/autor.jpg` (copiado desde `public/`)
  - `dist/og/{home,autor,memorias}.png` (copiados desde `public/`, 1200×630)
- Deploy con Wrangler CLI: `pnpm dlx wrangler pages deploy dist`.

## URLs y redirects

- No hay redirects configurados en MVP. La estructura de URLs es directa.
- El sitemap **excluye** `/404` (filter en `astro.config.mjs`).
- El feed RSS y el sitemap se generan en build, no en dev.
- Si en el futuro se quiere mover de `/memorias/:slug` a otra estructura, configurar redirects en `astro.config.mjs` con `redirects: { ... }` para preservar backlinks.

## Notas operativas

- **Sin secretos que migrar**: el sitio no usa bases de datos, claves de API, ni variables de entorno en runtime.
- **Sin `404.html` para Cloudflare custom**: la página 404 de Astro se sirve desde `dist/404.html` (no desde Cloudflare Pages custom errors).
- **Imágenes**: Astro optimiza las imágenes inline en build (genera variantes webp). Los OG images y el favicon se sirven tal cual desde `public/`.
- **OG images**: se generan manualmente (o con HCTI MCP) y se commitean en `public/og/`. No hay generación dinámica en build (no se usa `satori` ni similar en MVP).

## Pendientes

- Configurar Cloudflare Pages project + Git integration.
- Configurar `raizinterna.xyz` como custom domain en Cloudflare Pages.
- Verificar que `raizinterna.resagar.com` siga apuntando al mismo proyecto (CNAME en `resagar.com`).
- Generar las OG images finales y reemplazar los placeholders.
- Configurar el repo git con un `origin` (no tiene aún).
- (Opcional) Configurar Cloudflare Web Analytics o similar — no en MVP.
- (Opcional) Agregar CI con GitHub Actions para type-check + build en PRs.

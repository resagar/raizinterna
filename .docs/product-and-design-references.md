# Referencias de producto y diseño

Este doc es el puente entre el proyecto de diseño en Stitch y este repo Astro. Documenta de dónde vienen las decisiones de diseño y cómo se mapean a la implementación. **No es un contrato de implementación**: el comportamiento de Stitch (vistas, assets) se reemplaza por su equivalente en Astro.

## Fuente de diseño

El proyecto de diseño vive en **Google Stitch** bajo el ID `projects/8094559307907069471`, título **"Raíz Interna - Minimalist Blog"**.

El `designMd` exportado por Stitch define:

- **Brand**: Minimalist Literary / slow-web. Quietud, calidez, precisión editorial, tactilidad.
- **Paleta**: ivory `#faf7f2`, warm brown `#1e1810`, muted `#4c463f`, umber `#5a4e3a`, amber gold `#8a6a36` (acento), outline `#7d766e`, divider `#e4dace`. El gold fue oscurecido desde `#a17e42` (3.5:1 sobre ivory, fallaba WCAG AA) a `#8a6a36` (4.68:1, pasa WCAG AA). Los tokens reales aplicados son los overrides de Stitch (`overrideNeutralColor`, `overridePrimaryColor`, `overrideSecondaryColor`, `on-tertiary-container`, `divider-light`), no los `namedColors` originales.
- **Tipografía base de Stitch**:
  - Headings: **Playfair Display** (28/36/48px).
  - Body: **Source Serif 4** (18/20px, line-height 1.75).
  - Label: **Work Sans** (12px, small caps).
- **Forma**: sharp 0px, sin sombras, layout de columna única max 680px.
- **Espaciado**: section padding 5rem, stack gaps 1/2.5/4rem.
- **Pantallas existentes**: Homepage y Reading Page.

## Decisión del proyecto: tipografía

El proyecto **sobrescribe** la tipografía de Stitch con tres familias elegidas por el autor:

| Rol | Stitch original | Proyecto raíz interna |
|---|---|---|
| Logo | (no especificado) | **Cormorant Garamond 300** |
| Headings | Playfair Display 400 | **Playfair Display 400** ✅ igual |
| Body | Source Serif 4 400 | **Lora 400** (400-italic para énfasis) |
| Label | Work Sans 400 | **Work Sans 400** ✅ igual |

**Justificación del override de Lora sobre Source Serif 4**: Lora es ligeramente más cálida y legible en pantalla para textos largos en español, sin perder la sensación editorial. Cormorant Garamond para el logo da una presencia de marca más distintiva que Playfair Display solo.

## Mapeo de vistas de Stitch → componentes Astro

| Vista Stitch | Componente Astro sugerido | Notas |
|---|---|---|
| Homepage (hero + lista de memorias) | `src/pages/index.astro` + (futuro) `src/components/HeroHeader.astro` + `src/components/PostCard.astro` | Hero corto: "Raíz Interna" en Cormorant Garamond + tagline. Lista de memorias en card stack (sin borde, sin sombra). |
| Reading Page (memoria individual) | `src/pages/memorias/[slug].astro` | Header con título en Playfair Display, fecha y tags en Work Sans small caps. Body en Lora con `.prose` (typography plugin). |
| (no existe en Stitch todavía) | `src/pages/autor.astro` | Bio corta. Pendiente: generarla con Stitch si se quiere una pantalla de referencia. |
| (no existe en Stitch) | `src/pages/404.astro` | Estándar: BaseLayout + mensaje + link al home. |

## Componentes

- `src/components/Nav.astro` — nav del sitio con brand "Raíz Interna" en Cormorant Garamond + links.
- `src/components/Footer.astro` — footer minimalista con línea de copyright y link "Sobre el autor".

## Componentes pendientes

Conforme se necesiten, siguiendo la convención de "Flat & Layerless":

- `src/components/PostCard.astro` — card de memoria en el listado del home. Sin border, sin sombra. Headline + fecha + excerpt separados por whitespace. (Por ahora el home renderiza el card inline en `index.astro`.)
- `src/components/PostMeta.astro` — fila de metadata (fecha · autor · tiempo de lectura) en Work Sans small caps, separados por middle dot. (Por ahora la metadata se renderiza inline en `[slug].astro`.)
- `src/components/HeroHeader.astro` — hero del home con "Raíz Interna" en Cormorant Garamond + tagline + (opcional) avatar. (Por ahora el hero es un header simple en `index.astro`.)

## Assets reutilizables (placeholders en MVP)

| Asset | Estado | Notas |
|---|---|---|
| `public/favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `favicon.ico` | Generados con `scripts/generate-favicon.mjs` desde `logo.jpeg` | Listos y referenciados en `BaseLayout.astro` (16/32/180 + SVG + ICO) |
| `public/og/home.png` | Placeholder 1200×630 | Generar con Stitch o HCTI antes de producción |
| `public/og/autor.png` | Placeholder 1200×630 | Generar con Stitch o HCTI antes de producción |
| `public/og/memorias.png` | Placeholder 1200×630 | Generar con Stitch o HCTI antes de producción |
| Foto de perfil (autor) | Pendiente | Va en `src/assets/images/` cuando exista, se importa como `Image` para optimización |

## Advertencias

- **No copiar el código de Stitch literalmente** — Stitch exporta HTML/CSS de referencia, no de producción. El blog se construye con componentes Astro idiomáticos.
- **No usar DaisyUI** aunque `resagar` lo use — el sistema de diseño de Raíz Interna (heredado de Stitch) es plano y sin elevación.
- **El override tipográfico está documentado y es intencional** — si en el futuro Stitch actualiza el design system y cambia la tipografía, este doc hay que actualizarlo.
- **Stitch puede seguir siendo la fuente de pantallas adicionales** (página de autor, página de tags, etc.) — se generan con `stitch_generate_screen_from_text` y se traducen a componentes Astro.

## Pendientes

- Generar la página `/autor` en Stitch (no existe todavía) y mapearla a `src/pages/autor.astro` si se quiere diseño de referencia.
- Generar las OG images finales (placeholders en MVP).
- Decidir si se quiere una nav fija o que aparezca solo en el hero.

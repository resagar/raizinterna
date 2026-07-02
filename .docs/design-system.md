# Sistema de diseño

El sistema de diseño de Raíz Interna está definido en el proyecto Stitch **"Raíz Interna - Minimalist Blog"** (`projects/8094559307907069471`). Es una estética **Minimalist Literary / slow-web**: quietud, calidez, precisión editorial, tactilidad.

> Ver también: [`.docs/product-and-design-references.md`](./product-and-design-references.md) para el origen y mapeo de las decisiones.

## Brand & Style

- **Quietud**: espacio negativo generoso, las ideas respiran.
- **Calidez**: paleta adyacente a monocromo, orgánica más que clínica.
- **Precisión**: tipografía de grado editorial donde el texto *es* la interfaz.
- **Tactilidad**: contraste tipográfico y divisores sutiles que imitan el pliegue de un libro.

## Tipografía (decisión confirmada del proyecto)

| Rol | Familia | Peso | Uso |
|---|---|---|---|
| Logo / marca | **Cormorant Garamond** | 300 | "Raíz Interna" en el hero y nav |
| Headings (`h1`–`h6`) | **Playfair Display** | 400 | Títulos de páginas y memorias |
| Body | **Lora** | 400 + 400-italic | Texto corrido, contenido de memorias |
| Metadata / labels | **Work Sans** | 400 | Tags, fechas, categorías, en small caps |

**Regla de énfasis**: la itálica está preferida sobre la negrita para mantener peso visual consistente en el cuerpo del texto (heredado del design system de Stitch).

**Regla de tracking**: headings en Playfair Display con `letter-spacing` abierto (0.01–0.02em) para sensación aireada. Work Sans en small caps con `letter-spacing: 0.1em`.

**Line-height**: 1.75 en body para mantener el ritmo "unhurried" de lectura larga.

## Colores (mapeados a Tailwind 4 `@theme`)

| Token | Hex | Uso |
|---|---|---|
| `ivory` | `#faf7f2` | Fondo principal (background) |
| `ink` | `#1e1810` | Texto principal (cuerpo, títulos) |
| `muted` | `#4c463f` | Texto secundario, tagline, links de nav inactivos |
| `umber` | `#5a4e3a` | Texto de excerpts, signature italic, copy muted en footer |
| `gold` | `#8a6a36` | Acento: metadata italic de cards, links "LEER", CTAs (4.68:1 sobre ivory, pasa WCAG AA) |
| `line` | `#7d766e` | Outline (bordes sutiles si se usan) |
| `line-soft` | `#e4dace` | Divisores horizontales 50% (HRs entre cards, arriba del footer) |

`theme-color` meta = `#faf7f2` (background ivory).

**Origen**: estos son los valores de los overrides de Stitch (`overrideNeutralColor`, `overridePrimaryColor`, `overrideSecondaryColor`, `overrideTertiaryColor`, `on-tertiary-container` para el gold, `on-surface-variant` para muted, `divider-light` para line-soft). Los `namedColors` del designMd original tienen los valores sin override, que son más claros. Usamos los overrides porque son los que efectivamente se renderizan en los screens exportados de Stitch.

## Forma y elevación

- **Forma**: sharp (`0px`). Sin `border-radius` en containers, botones, ni imágenes.
- **Elevación**: plana. Sin sombras, sin blurs. La profundidad viene del contraste de color y el espacio negativo.
- **No hay jerarquía de surfaces** (no usar `surface-container`, `surface-container-high`, etc.). Todo se asienta directamente sobre el ivory.

## Espaciado

| Token | Valor | Uso |
|---|---|---|
| `max-width-prose` | `680px` | Ancho óptimo de línea (~70–80 caracteres) |
| `section-v-padding` | `5rem` (80px) | Padding vertical entre secciones mayores |
| `stack-gap-sm` | `1rem` | Separación entre elementos cercanos |
| `stack-gap-md` | `2.5rem` | Separación entre bloques medianos |
| `stack-gap-lg` | `4rem` | Separación entre secciones |

**Mobile**: márgenes laterales se expanden a 24px, padding vertical se reduce a 3rem, pero se mantiene la columna única.

## Componentes

- **Botones**: text-only u outlined con borde de 1px del color de texto. Sin fill, salvo para CTAs primarios donde el fill es el color de acento.
- **Links inline**: color de acento con un underline de 1px que no toca las descendientes. En hover, el underline se engrosa o cambia de color.
- **Divisores (HR)**: 1px, centrados, 50% del ancho del container.
- **Metadata chips**: small caps, sin contenedor, separados por middle dot (`·`).
- **Input fields**: solo border-bottom de 1px, sin fill. Labels arriba en estilo `label-sm`.
- **Cards**: sin border, sin sombra. Una "card" es simplemente un grupo de headline + fecha + excerpt separados por whitespace.

## Accesibilidad

- Contraste alto entre `#1e1810` y `#faf7f2` (cumple WCAG AAA).
- `prefers-reduced-motion` respetado en cualquier animación (el design actual no tiene animaciones obligatorias, pero queda documentado para futuros agregados).
- Alt text obligatorio en OG images, imágenes inline, y avatares.
- `lang="es"` en `<html>`.

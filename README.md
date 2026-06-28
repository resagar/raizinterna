# Raíz Interna

Blog personal íntimo de René García: historias de crianza neurodivergente y pensamientos en voz alta. Hecho con Astro, sin filtro editorial, sin solemnidad.

## Stack

- [Astro](https://astro.build) 7
- TypeScript (modo strict)
- [Tailwind CSS](https://tailwindcss.com/) 4 con `@tailwindcss/typography`
- [pnpm](https://pnpm.io)
- Node.js >= 22.12.0

## Comandos

| Comando                  | Acción                                                  |
| ------------------------ | ------------------------------------------------------- |
| `pnpm install`           | Instala las dependencias                                |
| `pnpm dev`               | Inicia el dev server en `http://localhost:4321`         |
| `pnpm build`             | Genera el build de producción en `./dist/`              |
| `pnpm preview`           | Previsualiza el build localmente                        |
| `pnpm og:placeholders`   | Regenera las OG images placeholder en `public/og/`      |
| `pnpm astro`             | Acceso a la CLI de Astro (`add`, `check`, etc.)         |

> El dev server se inicia en segundo plano con `astro dev --background`. Administralo con `astro dev stop`, `astro dev status` y `astro dev logs`.

## Documentación para agentes

Si sos un agente de IA, empezá por `AGENTS.md` y descubrí el contexto del proyecto de forma progresiva en `.docs/`:

- `.docs/README.md`: índice de discovery.
- `.docs/project-context.md`: propósito, audiencia y estado.
- `.docs/design-system.md`: tokens de diseño (colores, tipografía, espaciado).
- `.docs/seo-checklist.md`: SEO completo (meta tags, JSON-LD, OG, RSS, sitemap).
- `.docs/content-and-i18n.md`: idioma, schemas de content collections, RSS, sitemap.
- `.docs/architecture.md`: convenciones de Astro.
- `.docs/repo-map.md`: dónde encontrar las cosas.
- `.docs/stack-and-workflow.md`: stack y comandos.
- `.docs/deployment.md`: target de deploy.
- `.docs/product-and-design-references.md`: origen del diseño (Stitch) y mapeo a componentes.

## Estado

Proyecto en bootstrap. Estructura base + SEO + docs + content collection armada. Falta: contenido real (más allá de la memoria de ejemplo), OG images definitivas, y deploy a Cloudflare Pages bajo `raizinterna.resagar.com`.

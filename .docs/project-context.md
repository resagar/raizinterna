# Contexto del proyecto

Raíz Interna es el blog personal íntimo de René García. Es un espacio para escribir historias sobre cómo vive su crianza y sus pensamientos neurodivergentes (TDAH + AACC), sin filtro editorial ni la solemnidad de un blog profesional.

A diferencia de su blog técnico ([resagar.com](https://resagar.com)) — que cubre software, escritura como oficio y paternidad desde un ángulo más profesional —, Raíz Interna es el lugar de las historias en bruto: lo que se siente criando con una mente que es a la vez ventaja y obstáculo.

## Propósito

- Dar un espacio público a la voz íntima del autor, distinta a su marca profesional.
- Documentar la experiencia de criar siendo neurodivergente, con honestidad y sin la presión de "ser una guía".
- Acompañar a lectores que se identifican con esa experiencia y se sienten solos en ella.

## Usuarios

- **Lector/a hispanohablante** que se identifica con la paternidad/maternidad neurodivergente o con las dificultades de criar con TDAH/AACC. Llega por búsqueda, RSS o recomendación. Quiere leer, sentirse comprendido/a, eventualmente suscribirse.
- **René (autor)**: publicar memorias cuando tiene algo genuino que decir, mantener la página `/autor` actualizada, sostener su presencia online sin la obligación de un calendario editorial.

## Tono y voz

- Primera persona, reflexivo, sin solemnidad.
- Admite contradicciones y momentos poco heroicos.
- No es un blog de consejos ni un manual de "cómo ser neurodivergente y criar bien".
- Es René intentando hacerlo, en público.

## Secciones del sitio

- `/` — home = listado de memorias. Hero corto + lista en orden cronológico inverso.
- `/memorias/:slug` — memoria individual.
- `/autor` — bio corta del autor (más breve que el `/about` de resagar).
- `/feed.xml` — RSS.
- `/sitemap-index.xml` y `/sitemap-0.xml` — sitemap.
- `/404` — página no encontrada.

## Estado actual

Proyecto en bootstrap. Se está armando la base de Astro 7 + Tailwind 4 con el sistema de diseño definido en Stitch (proyecto "Raíz Interna - Minimalist Blog"). No hay contenido todavía más allá de la memoria de ejemplo (`bienvenida.md`).

## Decisiones de producto pendientes

- Si se quiere un sistema de tags visible o no.
- Si se quiere newsletter (no en MVP).
- Si se quiere una página `/now` estilo "lo que estoy haciendo ahora" (resagar la tiene; acá no por ahora).
- Si se quieren comentarios (no en MVP).
- Internacionalización: contenido solo en español, sin plan de i18n declarado.

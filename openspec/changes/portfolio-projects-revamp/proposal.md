# Proposal: Portfolio Projects Revamp + AI Workflow Page

## Intent
Elevar el portafolio para que sea un perfil profesional de alta señal tanto para reclutadores humanos como para herramientas de IA (scrapers, LLMs, ATS). Mostrar profundidad técnica por proyecto y una página dedicada a la forma de trabajar con IA bajo el estándar Human-In-The-Loop.

## Scope
- Sustituir lista hardcodeada en `ProjectsSection.astro` por una **Astro Content Collection**.
- Nueva página índice `/projects` con todos los proyectos.
- Sección "Featured" en home limitada a **4 proyectos** (campo `featured: true`).
- Páginas individuales `/projects/[slug]` con secciones: Problema, Stack, Decisiones técnicas, Retos, Solución, Aprendizajes, Galería.
- Página dedicada `/ai-workflow` (Human-In-The-Loop, herramientas, metodologías).
- SEO + accesibilidad: meta tags, OpenGraph, JSON-LD (`Person`, `CreativeWork`, `Article`), headings semánticos, alt descriptivos, skip links.
- Refactor del header para incluir los nuevos enlaces.
- Diseño refinado manteniendo paleta y tipografía actuales.

## Out of Scope
- Internacionalización formal (i18n).
- CMS externo / Sanity / Strapi.
- Dark mode toggle (ya existe variable, no se cambia).
- Acceso a repos privados del usuario para extraer stack automático.

## Risks
- Imágenes faltantes (Chat, Face Detection): se generan placeholders SVG temáticos.
- Datos de stack incompletos: se infieren del CONTENT.md proporcionado.

## Success Criteria
- `pnpm build` pasa sin errores.
- Cada proyecto tiene URL canónica `/projects/<slug>`.
- Home muestra exactamente 4 destacados.
- Lighthouse SEO ≥ 95 (objetivo).
- JSON-LD valida en https://validator.schema.org.

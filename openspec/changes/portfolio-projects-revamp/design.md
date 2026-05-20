# Design: Portfolio Projects Revamp

## Arquitectura

```
src/
├─ content/
│  ├─ config.ts                # schema zod de la colección
│  └─ projects/
│     ├─ ecommerce-cap-bros.md
│     ├─ sgi-inventario.md
│     ├─ chat-tiempo-real.md
│     ├─ code-jay.md
│     ├─ rest-api-mvc.md
│     ├─ face-detection-js.md
│     └─ resume-videos.md
├─ components/
│  ├─ seo/
│  │  ├─ SEO.astro             # meta + OG + canonical
│  │  └─ JsonLd.astro          # JSON-LD genérico
│  ├─ projects/
│  │  ├─ ProjectCard.astro
│  │  ├─ ProjectHero.astro
│  │  ├─ ProjectSection.astro
│  │  ├─ ProjectGallery.astro
│  │  ├─ ProjectTOC.astro
│  │  ├─ ProjectNav.astro      # prev/next
│  │  └─ StatusBadge.astro
│  └─ ai/
│     └─ ToolCard.astro
├─ layouts/
│  ├─ Layout.astro             # extendido con props SEO
│  └─ ProjectLayout.astro      # usa Layout, añade estructura común
├─ lib/
│  ├─ site.ts                  # constantes globales del portafolio
│  └─ projects.ts              # helpers (getFeatured, getAll, getRelated)
└─ pages/
   ├─ index.astro
   ├─ projects/
   │  ├─ index.astro
   │  └─ [slug].astro
   └─ ai-workflow.astro
```

## Decisiones clave

### Content Collections
- Tipo `content` (Markdown) — permite cuerpo libre además de frontmatter, útil para futuras secciones.
- Schema en `zod` para autocompletado y validación en build.

### Imágenes
- **Fotos reales**: permanecen en `public/projects/...` (ya están servidas como estáticas, no requieren optimización urgente).
- **Placeholders generados**: SVGs nuevos en `public/projects/placeholders/`. Marcamos `coverImage` con esa ruta.
- Próxima iteración: migrar a `src/assets` con `<Image>` de Astro para optimización automática.

### JSON-LD
- Helper `JsonLd.astro` recibe objeto y emite `<script type="application/ld+json">`.
- En home: `Person` con `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn), `knowsAbout`.
- En `[slug]`: `CreativeWork` con `author` → Person, `programmingLanguage`, `keywords`, `dateCreated`.
- En `/ai-workflow`: `Article` con `headline`, `mainEntityOfPage`, `about` (Human-In-The-Loop, Software Architecture).

### Accesibilidad
- Skip link `<a href="#main">` justo después de `<body>`.
- `<main id="main" tabindex="-1">` en todas las páginas.
- Status badge con `aria-label` ampliado ("Estado del proyecto: Producción").
- Galería: `role="list"`, cada imagen wrap `role="listitem"`.

### Performance
- `loading="lazy"` para imágenes bajo el fold.
- `fetchpriority="high"` para el hero image de cada proyecto.

### Estilo visual
- Reutiliza variables existentes (`--primary`, `--card`, etc.).
- Añade un patrón sutil de "grid lines" en el hero del proyecto (CSS gradient) para diferenciar de home.
- Tarjetas con borde + hover lift + transición 200ms.
- Tipografía: `Geist Sans` ya cargada; añadimos `prose` de tailwind typography para cuerpo del proyecto.

# Spec: Portfolio Projects Revamp

## Requirement 1 — Content Collection `projects`
Astro debe exponer una colección tipada con los campos:

| campo | tipo | obligatorio |
|---|---|---|
| `title` | string | sí |
| `summary` | string (≤ 160) | sí |
| `category` | "featured" \| "other" | sí |
| `featured` | boolean | sí |
| `featuredOrder` | number | no |
| `status` | "production" \| "beta" \| "private" \| "self-hosted" \| "wip" | sí |
| `technologies` | string[] | sí |
| `liveUrl` | string (url) | no |
| `repoUrl` | string (url) | no |
| `coverImage` | string (path) | sí |
| `gallery` | { src, alt }[] | no |
| `revealCode` | boolean (default true) | no |
| `publishedDate` | date | sí |

### Scenario 1.1
- **WHEN** existen ≥ 4 proyectos con `featured: true`
- **THEN** la sección Featured del home muestra exactamente los 4 de menor `featuredOrder`.

### Scenario 1.2
- **WHEN** un proyecto tiene `revealCode: false`
- **THEN** el detalle no muestra el botón "Code", solo "Demo" si aplica.

## Requirement 2 — Página de detalle `/projects/[slug]`
Debe contener, en orden, las secciones:
1. Hero (título, summary, status badge, tech chips, CTAs)
2. Tabla de contenidos navegable (sticky en desktop)
3. Problema que resuelve
4. Stack & Decisiones técnicas
5. (Imagen 1 — opcional, separada por texto)
6. Retos encontrados
7. Cómo los resolvió
8. (Imagen 2 — opcional)
9. Aprendizajes
10. Galería completa
11. JSON-LD `CreativeWork`
12. Navegación: anterior / siguiente proyecto

### Scenario 2.1
- **WHEN** se solicita un slug inexistente
- **THEN** Astro devuelve 404 nativo.

## Requirement 3 — Página `/projects` (todos)
Grilla responsive con todos los proyectos ordenados: featured primero por `featuredOrder`, luego others por `publishedDate` desc. Filtro visual por categoría (featured / other).

## Requirement 4 — Página `/ai-workflow`
Artículo largo con secciones: Filosofía Human-In-The-Loop, Rol de Arquitecto, Herramientas que uso (editor, agentes, modelos), Metodologías y estándares, Cómo decido qué modelo usar, Cómo controlo costos, Ejemplo de flujo real. Incluye JSON-LD `Article` y `Person`.

## Requirement 5 — SEO & Accesibilidad
- `<Layout>` acepta props `title`, `description`, `ogImage`, `canonical`, `jsonLd`.
- Cada página define las 4 primeras.
- Skip link al inicio del `<body>`.
- Headings con jerarquía estricta (un `<h1>` por página).
- Imágenes con `alt` descriptivo no decorativo.
- `<html lang>` correcto por página (es/en según contenido).

### Scenario 5.1
- **WHEN** un bot de IA crawlea `/projects/ecommerce-cap-bros`
- **THEN** encuentra JSON-LD `CreativeWork` con `author` referenciando al `Person` del autor.

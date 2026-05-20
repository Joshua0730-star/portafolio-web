---
title: "Code Jay — Plugin de Figma"
summary: "Plugin para Figma que genera código de producción en múltiples tecnologías a partir de cualquier selección de elementos del diseño. Acorta el ciclo diseño → frontend a un solo clic."
category: "featured"
featured: true
featuredOrder: 4
status: "production"
technologies:
  - "Node.js"
  - "TypeScript"
  - "JavaScript"
  - "Astro"
  - "Express.js"
  - "Tailwind CSS"
  - "Figma Plugin API"
liveUrl: "https://www.figma.com/community/plugin/1493662629267995590"
repoUrl: "https://github.com/Joshua0730-star/Code-Jay-"
coverImage: "/projects/destacados/CodeJay/code-jay-image.svg"
coverAlt: "Imagen de portada del plugin Code Jay generando código a partir de un diseño"
gallery: []
keywords:
  - "figma plugin"
  - "code generation"
  - "design to code"
  - "developer tools"
publishedDate: 2024-06-01
---

## Problema que resuelve

Pasar de un diseño en Figma a código de producción suele ser repetitivo y propenso a errores: ajustar paddings, escribir clases, traducir tokens. **Code Jay** automatiza esa traducción: el diseñador o desarrollador selecciona elementos en Figma y obtiene código limpio, listo para producir, en su stack preferido.

## Stack y decisiones técnicas

- **TypeScript** como base para todo el plugin: tipos = contrato con la Figma API.
- **Generación de código por target**: cada tecnología (HTML/CSS, Tailwind, Astro, React) tiene su propio generador que parte de un modelo intermedio común.
- **Velocidad como requisito**: el plugin se siente lento si tarda más de unos cientos de ms; toda la pipeline está optimizada para ese presupuesto.
- **Calidad del código generado** por encima de cantidad: indentación correcta, nombres semánticos, sin estilos inline cuando hay una alternativa mejor.

## Retos encontrados

- **Interactuar con una API que no conocía** (Figma Plugin API): mapear sus tipos a un modelo propio sin acoplarse de más.
- **Soportar múltiples tecnologías** sin duplicar lógica.
- **Mantener el código generado legible**, no solo funcional.

## Cómo resolví los retos

- **Leer la documentación oficial completa** antes de escribir nada serio.
- **Modelo intermedio** entre el árbol de Figma y el generador final → desacoplo total entre lo que se lee y lo que se emite.
- **Comparar la salida contra código escrito a mano** para refinar el formateo iterativamente.

## Qué aprendí

- A **explorar APIs nuevas con disciplina**: leer primero, escribir después.
- A **diseñar pipelines** con etapas claras (parse → normalizar → emitir).
- A **medir calidad de output** con criterios reproducibles, no por intuición.

## Estado actual

Publicado en el directorio público de plugins de Figma.

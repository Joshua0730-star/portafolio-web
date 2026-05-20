---
title: "SGI — Sistema de Gestión de Inventario"
summary: "Plataforma cloud para empresas que manejan productos perecederos: control de inventario, alertas predictivas de merma, métricas de venta en tiempo real y asistente con IA para decisiones operativas."
category: "featured"
featured: true
featuredOrder: 2
status: "production"
technologies:
  - "Cloud Database"
  - "Big Data / Analytics"
  - "Tareas asíncronas"
  - "Gestión multi-usuario"
  - "Asistente con IA"
  - "Arquitectura limpia"
revealCode: false
coverImage: "/projects/destacados/SGI/home-view.png"
coverAlt: "Pantalla principal del SGI con resumen operativo"
gallery:
  - src: "/projects/destacados/SGI/inventario-view.png"
    alt: "Vista de inventario con estado por producto y fechas críticas"
    caption: "Inventario con visibilidad de fechas críticas"
  - src: "/projects/destacados/SGI/estadisticas-view-1.png"
    alt: "Panel de estadísticas con KPIs y series temporales"
    caption: "Métricas de venta con series temporales"
  - src: "/projects/destacados/SGI/estadisticas-view-2.png"
    alt: "Segundo panel con análisis comparativo"
  - src: "/projects/destacados/SGI/asistenteAI-view.png"
    alt: "Asistente con IA que responde consultas sobre el inventario"
    caption: "Asistente con IA contextualizado al negocio del usuario"
  - src: "/projects/destacados/SGI/supervisor-layout.png"
    alt: "Vista de supervisor con permisos y trazabilidad"
keywords:
  - "inventory management"
  - "perishables"
  - "predictive alerts"
  - "data-driven decisions"
  - "cloud architecture"
publishedDate: 2024-11-15
---

## Problema que resuelve

Las microempresas que venden productos perecederos (alimentos, cosmética, farmacia) pierden margen por **merma evitable**: stock que caduca antes de venderse porque nadie lo detectó a tiempo. El SGI convierte esa pérdida en información accionable: alerta antes de que el producto se vuelva pérdida, propone rotaciones y permite tomar decisiones con datos en vez de intuición.

## Stack y decisiones técnicas

- **Persistencia en la nube** para que los datos estén disponibles desde cualquier sucursal, sin servidores físicos.
- **Procesos en paralelo y segundo plano** para cargas masivas (importación de inventario inicial, recalcular métricas diarias).
- **Modelo de datos orientado a fechas**: cada lote de producto tiene fecha de ingreso, vencimiento y rotación esperada. La consulta crítica es "qué vence en los próximos N días".
- **Asistente con IA contextualizado** al negocio del usuario: responde preguntas operativas usando los datos reales del SGI como contexto.
- **Manejo de múltiples usuarios con roles** (admin, supervisor, operador) y separación estricta de permisos por rol.

![Vista de inventario con fechas críticas](/projects/destacados/SGI/inventario-view.png)

## Retos encontrados

1. **Diseñar el modelo de datos correcto**: representar lotes, vencimientos, rotaciones y devoluciones sin volver imposibles las consultas.
2. **Persistencia en la nube** con consistencia adecuada y costos controlados.
3. **Volúmenes grandes de datos históricos**: empresas con un año de operación tienen miles de movimientos. Las queries debían seguir siendo rápidas.
4. **Predicción útil, no ruido**: alertar tantas veces que el usuario las ignora es peor que no alertar.

## Cómo resolví los retos

- **Iteré el modelo con casos reales**: empecé por entrevistar el dominio (qué hace un encargado de bodega un día normal) antes de modelar.
- **Índices y vistas materializadas** para las consultas de dashboard, sin penalizar las escrituras.
- **Procesos batch nocturnos** para precalcular métricas pesadas y dejar el dashboard responsivo durante el día.
- **Alertas con prioridad**: el sistema clasifica por nivel de urgencia (vence hoy, vence esta semana, sobre-stock) en vez de tratarlas a todas igual.
- Apoyo de IA para explorar trade-offs de arquitectura y desbloquear conceptos nuevos, pero las decisiones finales son mías y revisadas.

![Estadísticas con KPIs y series temporales](/projects/destacados/SGI/estadisticas-view-1.png)

## Qué aprendí

- A pensar la **arquitectura limpia** como un activo del negocio, no como un capricho técnico.
- A diseñar **modelos de datos centrados en el caso de uso real**, no en la elegancia teórica.
- A integrar IA como **valor añadido contextual**, alimentando al asistente con los datos del usuario en vez de respuestas genéricas.
- A diferenciar **alertas accionables** de ruido informativo.

![Asistente con IA contextualizado](/projects/destacados/SGI/asistenteAI-view.png)

## Estado actual

En producción. Código fuente privado por confidencialidad con el cliente. Demo bajo petición.

---
title: "Face Detection JS"
summary: "Sistema de detección de rostros en imágenes y video usando librerías y modelos modernos de IA en el navegador. Exploración práctica de visión por computador del lado del cliente."
category: "other"
featured: false
status: "self-hosted"
technologies:
  - "JavaScript"
  - "face-api.js / TensorFlow.js"
  - "Visión por computador"
  - "Modelos pre-entrenados"
  - "Canvas API"
revealCode: true
coverImage: "/projects/other_projects/face-detection-js/face-detection-cover.svg"
coverAlt: "Ilustración temática de detección facial con bounding box y puntos de referencia"
gallery: []
keywords:
  - "computer vision"
  - "face detection"
  - "tensorflow.js"
  - "client-side AI"
publishedDate: 2024-03-20
---

## Problema que resuelve

Hacer visión por computador en el navegador parece magia y a la vez es accesible: con modelos pre-entrenados se puede detectar rostros, expresiones y puntos faciales **sin enviar datos al servidor**, manteniendo la privacidad del usuario.

## Stack y decisiones técnicas

- **Inferencia 100% del lado del cliente**: ningún frame sale del navegador.
- **Modelos pre-entrenados** cargados una sola vez y reutilizados a lo largo de la sesión.
- **Loop de detección sincronizado con `requestAnimationFrame`** para no saturar el thread principal.
- **Canvas API** para dibujar bounding boxes y landmarks sobre el video en vivo.

## Retos encontrados

- **Latencia y FPS**: la detección en cada frame es cara; había que decidir cuándo correrla y cuándo no.
- **Manejo de la cámara** con permisos, errores y dispositivos múltiples.
- **Precisión vs costo**: modelos más precisos son más lentos; elegir el modelo correcto por caso de uso.

## Cómo resolví los retos

- **Throttle del loop de detección** (cada N frames) en lugar de cada frame.
- **Fallback explícito** cuando la cámara no está disponible o el usuario rechaza permisos.
- **Comparación cuantitativa de modelos** midiendo FPS reales antes de comprometerme con uno.

## Qué aprendí

- A **integrar IA en el frontend** sin convertirlo en una caja negra.
- A pensar en **privacidad como ventaja arquitectónica**, no como restricción.
- A **medir performance** del lado del cliente con criterios reproducibles.

## Estado actual

Auto-alojado para uso personal y experimentación.

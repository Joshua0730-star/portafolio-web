---
title: "Video Summarizer"
summary: "Aplicación que resume videos de YouTube y los transcribe a alta velocidad, integrada con IA para entregar resúmenes accionables orientados al aprendizaje."
category: "other"
featured: false
status: "beta"
technologies:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
  - "React Hooks"
  - "Agentes de IA"
  - "Procesamiento de audio/transcripción"
liveUrl: "https://resumen-videos.vercel.app/"
repoUrl: "https://github.com/Joshua0730-star/videore"
coverImage: "/projects/other_projects/resumen-videos/resumen-videos.png"
coverAlt: "Captura de Video Summarizer mostrando un resumen generado a partir de un video de YouTube"
gallery: []
keywords:
  - "ai summarization"
  - "youtube"
  - "transcription"
  - "learning tools"
  - "agents"
publishedDate: 2024-08-12
---

## Problema que resuelve

Mucho contenido valioso vive en video, pero el tiempo es finito. **Video Summarizer** convierte un video largo de YouTube en un resumen estructurado y consultable, ideal para aprender más rápido y revisitar puntos clave sin re-ver el video completo.

## Stack y decisiones técnicas

- **Next.js + TypeScript** para tener SSR/SSG cuando hace falta y tipos en todo el flujo.
- **Pipeline con etapas claras**: obtener metadatos → obtener transcripción → resumir → estructurar salida.
- **Agentes de IA específicos por tarea**: un modelo para transcribir, otro para resumir, otro para extraer tópicos.
- **UI con feedback en streaming**: el usuario ve el resumen aparecer en vez de esperar a un bloque final.

## Retos encontrados

- **Variedad de fuentes**: no todos los videos tienen transcripción oficial; hay que decidir cuándo transcribir y cuándo reutilizar.
- **Costo y latencia de los modelos**: el resumen tiene que ser rápido y barato para ser útil.
- **Calidad del resumen**: un resumen mediocre es peor que ver el video.

## Cómo resolví los retos

- **Caché agresiva** de transcripciones y resúmenes ya generados.
- **Elección de modelo según la tarea**: barato y rápido para clasificar, capable y caro solo cuando aporta calidad.
- **Plantillas de prompt iteradas** comparando outputs contra resúmenes hechos a mano.

## Qué aprendí

- A **diseñar pipelines con IA** como ciudadano de primera clase, no como un parche al final.
- A **balancear costo, latencia y calidad** explícitamente, no por defecto.
- A construir UI que respeta el **tiempo de espera** del usuario con streaming y estados intermedios.

## Estado actual

En beta pública. Demo y código fuente disponibles.

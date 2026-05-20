---
title: "REST API con arquitectura MVC"
summary: "API REST construida con buenas prácticas profesionales: arquitectura MVC, inyección de dependencias, CRUD, validaciones y persistencia en SQL. Pensada como base sólida para sistemas reales."
category: "other"
featured: false
status: "production"
technologies:
  - "Node.js"
  - "Express.js"
  - "SQL"
  - "Arquitectura MVC"
  - "Inyección de dependencias"
  - "Validaciones"
  - "Rate limiting"
liveUrl: "https://rest-api-deploy-2ep9.onrender.com/movies"
repoUrl: "https://github.com/Joshua0730-star/nodejs-intermedio"
coverImage: "/projects/destacados/MVC/MVC-image.png"
coverAlt: "Diagrama representativo de la arquitectura MVC de la API"
gallery: []
keywords:
  - "rest api"
  - "mvc"
  - "dependency injection"
  - "sql"
  - "best practices"
publishedDate: 2024-04-15
---

## Problema que resuelve

Construir una API REST en Node.js sin estructura es rápido al principio y costoso a largo plazo: cada endpoint termina mezclando validación, lógica de negocio y acceso a datos. Esta API es una base limpia para desarrolladores que quieren un punto de partida con **arquitectura MVC**, validaciones y patrones probados.

## Stack y decisiones técnicas

- **Arquitectura MVC** con separación estricta de responsabilidades.
- **Inyección de dependencias** para hacer cada capa testeable de forma aislada.
- **Validaciones explícitas** en el borde del sistema (controlador) antes de tocar la base de datos.
- **Limitación de peticiones (rate limiting)** para proteger el endpoint público.
- **Persistencia SQL** con consultas controladas, sin abusar del ORM.

## Retos encontrados

- **Organizar el código** de forma limpia y escalable sin caer en sobre-ingeniería —al principio el patrón MVC se sentía confuso.
- **Separar capa de transporte de capa de dominio**: que el controlador no sepa cómo se guardan las cosas.

## Cómo resolví los retos

- **Documentación, pruebas y análisis profundo** del patrón hasta dominarlo.
- **Refactor iterativo**: empezar con todo junto y separar a medida que aparecían fricciones reales, no anticipadas.

## Qué aprendí

- Por qué la **arquitectura limpia** ahorra tiempo al mes 2, no al día 2.
- Cómo **inyectar dependencias** sin frameworks pesados.
- A **escribir validaciones útiles**, no solo defensivas.

## Estado actual

Desplegado y disponible públicamente. Código fuente abierto.

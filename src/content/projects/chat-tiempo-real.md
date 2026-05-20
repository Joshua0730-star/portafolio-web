---
title: "Chat en Tiempo Real"
summary: "Sistema de mensajería en tiempo real con foco en privacidad, seguridad y protocolos modernos. Pensado como base extensible para experimentar con arquitectura de red y comunicación bidireccional."
category: "featured"
featured: true
featuredOrder: 3
status: "self-hosted"
technologies:
  - "WebSockets"
  - "Node.js"
  - "Protocolos de red"
  - "Seguridad en transporte"
  - "Arquitectura cliente-servidor"
  - "Eventos en tiempo real"
revealCode: false
coverImage: "/projects/destacados/Chat/chat-cover.svg"
coverAlt: "Ilustración temática de chat en tiempo real con burbujas de mensaje"
gallery: []
keywords:
  - "realtime"
  - "websockets"
  - "messaging"
  - "network protocols"
  - "security"
publishedDate: 2024-07-10
---

## Problema que resuelve

La comunicación entre personas cercanas hoy depende de plataformas centralizadas con políticas opacas sobre los datos. Este sistema explora una alternativa **auto-alojada y minimalista**: mensajería directa entre usuarios, sin intermediarios, con foco en privacidad y control sobre la infraestructura.

## Stack y decisiones técnicas

- **Comunicación bidireccional** sobre WebSockets para latencia baja.
- **Protocolos y reglas explícitas** para el handshake, autenticación y formato de mensaje.
- **Modelo orientado a eventos** en el servidor: cada mensaje es un evento publicado a los suscriptores correctos.
- **Estado mínimo en el servidor**: el servidor enruta, no interpreta el contenido del mensaje.

## Retos encontrados

- **Aprender protocolos de red desde la base**: TCP, framing de mensajes, control de flujo, reconexión y backoff.
- **Seguridad en tránsito**: validación de identidad, prevención de replay, cifrado en transporte.
- **Mantener el sistema simple** sin renunciar a una arquitectura que pueda crecer.

## Cómo resolví los retos

- **Documentación oficial** y RFCs antes que tutoriales superficiales.
- **Iteraciones pequeñas con pruebas manuales** del flujo cliente↔servidor antes de añadir features.
- **Validación de cada decisión** consultando con IA y revisando contra fuentes primarias —yo decido, la IA acelera el aprendizaje.

## Qué aprendí

- Cómo se ven los **protocolos por dentro**, no solo como librería que se importa.
- Por qué la **arquitectura simple gana** cuando el dominio es complejo.
- A pensar en **seguridad como propiedad transversal**, no como un módulo añadido al final.

## Estado actual

Auto-alojado para uso personal. No expuesto públicamente por consideraciones de privacidad y seguridad mientras evoluciona.

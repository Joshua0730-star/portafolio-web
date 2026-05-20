---
lang: "en"
title: "SGI — Inventory Management System"
summary: "Cloud platform for businesses handling perishable products: inventory control, predictive spoilage alerts, real-time sales metrics, and an AI assistant for operational decisions."
category: "featured"
featured: true
featuredOrder: 2
status: "production"
technologies:
  - "Cloud Database"
  - "Big Data / Analytics"
  - "Asynchronous tasks"
  - "Multi-user management"
  - "AI Assistant"
  - "Clean architecture"
revealCode: false
coverImage: "/projects/destacados/SGI/home-view.png"
coverAlt: "SGI main screen with operational summary"
gallery:
  - src: "/projects/destacados/SGI/inventario-view.png"
    alt: "Inventory view with product status and critical dates"
    caption: "Inventory with critical date visibility"
  - src: "/projects/destacados/SGI/estadisticas-view-1.png"
    alt: "Statistics panel with KPIs and time series"
    caption: "Sales metrics with time series"
  - src: "/projects/destacados/SGI/estadisticas-view-2.png"
    alt: "Second panel with comparative analysis"
  - src: "/projects/destacados/SGI/asistenteAI-view.png"
    alt: "AI assistant that answers inventory queries"
    caption: "AI assistant contextualized to the user's business"
  - src: "/projects/destacados/SGI/supervisor-layout.png"
    alt: "Supervisor view with permissions and traceability"
keywords:
  - "inventory management"
  - "perishables"
  - "predictive alerts"
  - "data-driven decisions"
  - "cloud architecture"
publishedDate: 2024-11-15
---

## Problem it solves

Micro-enterprises selling perishable products (food, cosmetics, pharmaceuticals) lose margin due to **avoidable spoilage**: stock that expires before being sold because no one detected it in time. The SGI converts this loss into actionable information: it alerts before the product becomes a loss, proposes rotations, and allows decisions to be made with data instead of intuition.

## Stack and technical decisions

- **Cloud persistence** so that data is available from any branch, without physical servers.
- **Parallel and background processes** for massive loads (initial inventory import, recalculating daily metrics).
- **Date-oriented data model**: each product batch has an entry date, expiration date, and expected rotation. The critical query is "what expires in the next N days".
- **AI assistant contextualized** to the user's business: answers operational questions using real SGI data as context.
- **Management of multiple users with roles** (admin, supervisor, operator) and strict separation of permissions by role.

![Inventory view with critical dates](/projects/destacados/SGI/inventario-view.png)

## Challenges encountered

1. **Designing the correct data model**: representing batches, expirations, rotations, and returns without making queries impossible.
2. **Cloud persistence** with adequate consistency and controlled costs.
3. **Large volumes of historical data**: companies with a year of operation have thousands of movements. Queries had to remain fast.
4. **Useful prediction, not noise**: alerting so often that the user ignores them is worse than not alerting.

## How I solved the challenges

- **Iterated the model with real cases**: I started by interviewing the domain (what a warehouse manager does on a normal day) before modeling.
- **Indexes and materialized views** for dashboard queries, without penalizing writes.
- **Nightly batch processes** to pre-calculate heavy metrics and keep the dashboard responsive during the day.
- **Prioritized alerts**: the system classifies by urgency level (expires today, expires this week, overstock) instead of treating them all equally.
- AI support to explore architectural trade-offs and unlock new concepts, but the final decisions are mine and reviewed.

![Statistics with KPIs and time series](/projects/destacados/SGI/estadisticas-view-1.png)

## What I learned

- To think of **clean architecture** as a business asset, not a technical whim.
- To design **data models focused on the real use case**, not theoretical elegance.
- To integrate AI as **contextual added value**, feeding the assistant with user data instead of generic responses.
- To differentiate **actionable alerts** from informational noise.

![AI assistant contextualized](/projects/destacados/SGI/asistenteAI-view.png)

## Current status

In production. Source code private due to client confidentiality. Demo available upon request.
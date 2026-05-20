---
lang: "en"
title: "Ecommerce Platform — Cap Bros"
summary: "Ecommerce platform distributed across two interconnected systems: a storefront for customers and an administration panel with product, order, payment, and real-time metric management."
category: "featured"
featured: true
featuredOrder: 1
status: "production"
technologies:
  - "Node.js"
  - "TypeScript"
  - "React"
  - "Event-driven architecture"
  - "Asynchronous processes"
  - "Online payments"
  - "PostgreSQL"
  - "Relational schema design"
  - "Design patterns"
revealCode: false
coverImage: "/projects/destacados/Eccomerce/client-ecommerce/home-view.png"
coverAlt: "Main view of the Cap Bros storefront with product catalog"
gallery:
  - src: "/projects/destacados/Eccomerce/client-ecommerce/colecciones-view.png"
    alt: "Ecommerce collections view"
    caption: "Navigation through public catalog collections"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/pruducto-1-view.png"
    alt: "Product detail with gallery and price"
    caption: "Product sheet with interactive gallery"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/producto-2-view.png"
    alt: "Product detail variant"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/carrito-view.png"
    alt: "Shopping cart with totals and payment options"
    caption: "Cart with total calculation and checkout flow"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/cuenta-view.png"
    alt: "User account panel with order history"
  - src: "/projects/destacados/Eccomerce/admin-panel/loggin-view.png"
    alt: "Admin panel login"
    caption: "Secure access to the administrative panel"
  - src: "/projects/destacados/Eccomerce/admin-panel/dashboard-1-view.png"
    alt: "Main dashboard with sales KPIs"
    caption: "Dashboard with key business indicators"
  - src: "/projects/destacados/Eccomerce/admin-panel/dashboard-2-view.png"
    alt: "Dashboard with sales charts and trends"
  - src: "/projects/destacados/Eccomerce/admin-panel/productos-view.png"
    alt: "Product manager with full CRUD"
    caption: "Product CRUD with enable/disable and pricing"
  - src: "/projects/destacados/Eccomerce/admin-panel/orders-view.png"
    alt: "Order tray with statuses and filters"
    caption: "Order management with statuses, filters, and traceability"
keywords:
  - "ecommerce"
  - "event-driven architecture"
  - "background jobs"
  - "payments"
  - "scalable systems"
  - "software architecture"
publishedDate: 2024-09-01
---

## Problem Solved

Most micro-businesses selling on social media lose sales due to manual processes: updating inventory in a spreadsheet, responding to orders via direct message, manually calculating shipping, and reconciling payments at month-end. **Cap Bros** eliminates this friction by offering a complete ecommerce platform with an administration panel that automates the business: products, orders, payments, metrics, and data-driven decisions.

The goal was not to build "another store," but a **distributed, event-driven foundation** that can grow with the company without requiring a rewrite.

## Stack and Technical Decisions

The system is composed of **two independent repositories** that communicate via events:

- **`client-cap-bros`** — public storefront for the end-user (catalog, cart, checkout, account).
- **`admin-panel-cb`** — backoffice for managing products, orders, payments, users, and metrics.

**Key decisions:**

- **Event-driven architecture** to decouple the storefront from the admin: when an order comes in, an event is published that triggers parallel tasks (notification, stock deduction, payment, invoice) without blocking the user.
- **Background and asynchronous processes** for costly tasks (mass email sending, payment reconciliation, report generation).
- **Careful data modeling**: aggressive normalization where consistency matters (products, inventory, payments) and selective denormalization where reading needs to be fast (public catalog, dashboards).
- **Design patterns** applied without over-engineering: Repository for data access, Factory for order creation with discount policies, Strategy for payment methods.
- **Layered security**: frontend and backend validation, salted password hashing, signed tokens, role-based access control on each admin endpoint.

> Deciding on the database model was the longest exercise of the project: validating against real-world scenarios (returns, combined promotions, products with variants) before writing a single line of code.

![Main view of the storefront](/projects/destacados/Eccomerce/client-ecommerce/home-view.png)

## Challenges Encountered

1. **Scalability under traffic spikes.** When a social media campaign explodes, dozens of orders arrive in seconds. Without decoupling, the storefront would collapse under its own weight.
2. **Reliable payment management.** Capturing the result of an external payment in real-time is deceptively difficult: there are timeouts, retries, duplicate payments, out-of-order webhooks.
3. **Background processes and real-time events.** I needed the customer to see "order confirmed" instantly, but heavy tasks had to execute outside the request.
4. **Consistency between the two systems.** If the admin updates the price or deactivates a product, the storefront must reflect it without stale cache.

## How I Solved the Challenges

- **Task queue + workers** to offload work from the main request. The user gets a response in milliseconds; the system finishes the work in the background.
- **Idempotency pattern in the payment handler**: each webhook enters with an `idempotency_key`, so provider retries do not generate duplicate orders.
- **Events as a contract between systems**: both repos consume the same event schemas, which reduces coupling and allows for versioning changes.
- **Iterative modeling with mini-prototypes**: before committing to a schema, I built mini-test systems to validate the idea against real-world edge cases.
- **Constant documentation**: what I didn't understand, I thoroughly researched (papers, RFCs, official documentation) and relied on AI as a second pair of eyes —never as the sole author.

![Administrative Dashboard](/projects/destacados/Eccomerce/admin-panel/dashboard-1-view.png)

## What I Learned

- To **model complex domains** (payments, inventory, returns) without falling into over-engineering.
- To **design for failure**: idempotency, retries, dead letter queues, observability.
- To **decide between strong and eventual consistency** depending on the use case: the cart can be eventual, payment never.
- To think like a **software architect**: prioritizing clear interfaces between subsystems over the internal elegance of each one.
- To work with AI under the **Human-In-The-Loop** standard: AI accelerates exploration, I decide the architecture and review every technical decision.

## Current Status

In production for pilot clients. Source code not public due to commercial agreement; demo available upon request.
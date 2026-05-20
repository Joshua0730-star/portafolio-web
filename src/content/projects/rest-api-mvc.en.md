---
lang: "en"
title: "REST API with MVC Architecture"
summary: "REST API built with professional best practices: MVC architecture, dependency injection, CRUD, validations, and SQL persistence. Designed as a solid foundation for real-world systems."
category: "other"
featured: false
status: "production"
technologies:
  - "Node.js"
  - "Express.js"
  - "SQL"
  - "MVC Architecture"
  - "Dependency Injection"
  - "Validations"
  - "Rate limiting"
liveUrl: "https://rest-api-deploy-2ep9.onrender.com/movies"
repoUrl: "https://github.com/Joshua0730-star/nodejs-intermedio"
coverImage: "/projects/destacados/MVC/MVC-image.png"
coverAlt: "Representative diagram of the API's MVC architecture"
gallery: []
keywords:
  - "rest api"
  - "mvc"
  - "dependency injection"
  - "sql"
  - "best practices"
publishedDate: 2024-04-15
---

## Problem it solves

Building a REST API in Node.js without structure is fast at first but costly in the long run: each endpoint ends up mixing validation, business logic, and data access. This API provides a clean foundation for developers who want a starting point with **MVC architecture**, validations, and proven patterns.

## Stack and Technical Decisions

- **MVC Architecture** with strict separation of concerns.
- **Dependency injection** to make each layer testable in isolation.
- **Explicit validations** at the system's edge (controller) before touching the database.
- **Request limiting (rate limiting)** to protect the public endpoint.
- **SQL persistence** with controlled queries, without over-relying on the ORM.

## Challenges Encountered

- **Organizing the code** cleanly and scalably without falling into over-engineering —initially, the MVC pattern felt confusing.
- **Separating the transport layer from the domain layer**: ensuring the controller doesn't know how things are stored.

## How I Solved the Challenges

- **Documentation, testing, and deep analysis** of the pattern until mastering it.
- **Iterative refactoring**: starting with everything together and separating as real, not anticipated, frictions emerged.

## What I Learned

- Why **clean architecture** saves time in month 2, not day 2.
- How to **inject dependencies** without heavy frameworks.
- To **write useful validations**, not just defensive ones.

## Current Status

Deployed and publicly available. Open source code.
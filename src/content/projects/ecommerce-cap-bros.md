---
title: "Ecommerce Platform — Cap Bros"
summary: "Plataforma de ecommerce distribuida en dos sistemas interconectados: storefront para clientes y panel de administración con gestión de productos, pedidos, pagos y métricas en tiempo real."
category: "featured"
featured: true
featuredOrder: 1
status: "production"
technologies:
  - "Node.js"
  - "TypeScript"
  - "React"
  - "Arquitectura orientada a eventos"
  - "Procesos asíncronos"
  - "Pagos en línea"
  - "PostgreSQL"
  - "Diseño de esquemas relacionales"
  - "Patrones de diseño"
revealCode: false
coverImage: "/projects/destacados/Eccomerce/client-ecommerce/home-view.png"
coverAlt: "Vista principal del storefront Cap Bros con catálogo de productos"
gallery:
  - src: "/projects/destacados/Eccomerce/client-ecommerce/colecciones-view.png"
    alt: "Vista de colecciones del ecommerce"
    caption: "Navegación por colecciones del catálogo público"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/pruducto-1-view.png"
    alt: "Detalle de producto con galería y precio"
    caption: "Ficha de producto con galería interactiva"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/producto-2-view.png"
    alt: "Variante de detalle de producto"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/carrito-view.png"
    alt: "Carrito de compras con totales y opciones de pago"
    caption: "Carrito con cálculo de totales y flujo de checkout"
  - src: "/projects/destacados/Eccomerce/client-ecommerce/cuenta-view.png"
    alt: "Panel de cuenta de usuario con historial de pedidos"
  - src: "/projects/destacados/Eccomerce/admin-panel/loggin-view.png"
    alt: "Login del panel de administración"
    caption: "Acceso seguro al panel administrativo"
  - src: "/projects/destacados/Eccomerce/admin-panel/dashboard-1-view.png"
    alt: "Dashboard principal con KPIs de ventas"
    caption: "Dashboard con indicadores clave del negocio"
  - src: "/projects/destacados/Eccomerce/admin-panel/dashboard-2-view.png"
    alt: "Dashboard con gráficos de ventas y tendencias"
  - src: "/projects/destacados/Eccomerce/admin-panel/productos-view.png"
    alt: "Gestor de productos con CRUD completo"
    caption: "CRUD de productos con habilitar/inhabilitar y precios"
  - src: "/projects/destacados/Eccomerce/admin-panel/orders-view.png"
    alt: "Bandeja de pedidos con estados y filtros"
    caption: "Gestión de pedidos con estados, filtros y trazabilidad"
keywords:
  - "ecommerce"
  - "event-driven architecture"
  - "background jobs"
  - "payments"
  - "scalable systems"
  - "software architecture"
publishedDate: 2024-09-01
---

## Problema que resuelve

La mayoría de microempresas que venden por redes sociales pierden ventas por procesos manuales: actualizar inventario en una hoja de cálculo, responder pedidos por mensaje directo, calcular envíos a mano y cuadrar pagos a fin de mes. **Cap Bros** elimina esa fricción ofreciendo una plataforma completa de ecommerce con un panel de administración que automatiza el negocio: productos, pedidos, pagos, métricas y decisiones basadas en datos.

El objetivo no era construir "otra tienda", sino una **base distribuida y orientada a eventos** que pueda crecer con la empresa sin reescribir nada.

## Stack y decisiones técnicas

El sistema está compuesto por **dos repositorios independientes** que se comunican mediante eventos:

- **`client-cap-bros`** — storefront público de cara al usuario final (catálogo, carrito, checkout, cuenta).
- **`admin-panel-cb`** — backoffice para gestión de productos, pedidos, pagos, usuarios y métricas.

**Decisiones clave:**

- **Arquitectura orientada a eventos** para desacoplar el storefront del admin: cuando entra un pedido, se publica un evento que dispara tareas paralelas (notificación, descuento de stock, pago, factura) sin bloquear al usuario.
- **Procesos en segundo plano y asíncronos** para tareas costosas (envíos masivos de email, conciliación de pagos, generación de reportes).
- **Modelado de datos cuidadoso**: normalización agresiva donde la coherencia importa (productos, inventario, pagos) y denormalización selectiva donde la lectura debe ser rápida (catálogo público, dashboards).
- **Patrones de diseño** aplicados sin sobre-ingeniería: Repository para el acceso a datos, Factory para creación de pedidos con políticas de descuento, Strategy para los métodos de pago.
- **Seguridad por capas**: validación en frontend y backend, hash de contraseñas con sal, tokens firmados, control de acceso por rol en cada endpoint del admin.

> Decidir el modelo de base de datos fue el ejercicio más largo del proyecto: validar contra escenarios reales (devoluciones, promociones combinadas, productos con variantes) antes de escribir una línea de código.

![Vista principal del storefront](/projects/destacados/Eccomerce/client-ecommerce/home-view.png)

## Retos encontrados

1. **Escalabilidad bajo picos de tráfico.** Cuando una campaña en redes sociales explota, decenas de pedidos llegan en segundos. Sin desacoplo, el storefront caía bajo su propio peso.
2. **Gestión de pagos confiable.** Capturar el resultado de un pago externo en tiempo real es engañosamente difícil: hay timeouts, reintentos, pagos duplicados, webhooks fuera de orden.
3. **Procesos en segundo plano y eventos en tiempo real.** Necesitaba que el cliente viera "pedido confirmado" instantáneamente, pero las tareas pesadas tenían que ejecutarse fuera del request.
4. **Coherencia entre los dos sistemas.** Si el admin actualiza el precio o desactiva un producto, el storefront debe reflejarlo sin caché obsoleto.

## Cómo resolví los retos

- **Cola de tareas + workers** para descargar trabajo del request principal. El usuario obtiene respuesta en milisegundos; el sistema termina el trabajo en segundo plano.
- **Patrón de idempotencia en el handler de pagos**: cada webhook entra con un `idempotency_key`, así reintentos del proveedor no generan pedidos duplicados.
- **Eventos como contrato entre sistemas**: ambos repos consumen los mismos esquemas de evento, lo que reduce acoplamiento y permite versionar cambios.
- **Modelado iterativo con mini-prototipos**: antes de comprometerme con un esquema, construía mini-sistemas de prueba para validar la idea contra casos límite reales.
- **Documentación constante**: lo que no entendía lo investigaba a fondo (papers, RFCs, documentación oficial) y me apoyaba en IA como segundo par de ojos —nunca como autor único.

![Dashboard administrativo](/projects/destacados/Eccomerce/admin-panel/dashboard-1-view.png)

## Qué aprendí

- A **modelar dominios complejos** (pagos, inventario, devoluciones) sin caer en sobre-ingeniería.
- A **diseñar para fallos**: idempotencia, reintentos, dead letter queues, observabilidad.
- A **decidir entre coherencia fuerte y eventual** según el caso de uso: el carrito puede ser eventual, el pago jamás.
- A pensar como **arquitecto de software**: priorizar interfaces claras entre subsistemas por encima de la elegancia interna de cada uno.
- A trabajar con IA bajo el estándar **Human-In-The-Loop**: la IA acelera la exploración, yo decido la arquitectura y reviso cada decisión técnica.

## Estado actual

En producción para los clientes piloto. Código fuente no público por acuerdo comercial; demo bajo petición.

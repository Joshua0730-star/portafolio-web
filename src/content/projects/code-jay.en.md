---
lang: "en"
title: "Code Jay — Figma Plugin"
summary: "Figma plugin that generates production-ready code in multiple technologies from any selection of design elements. Shortens the design → frontend cycle to a single click."
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
coverAlt: "Cover image of the Code Jay plugin generating code from a design"
gallery: []
keywords:
  - "figma plugin"
  - "code generation"
  - "design to code"
  - "developer tools"
publishedDate: 2024-06-01
---

## Problem Solved

Moving from a Figma design to production code is often repetitive and error-prone: adjusting paddings, writing classes, translating tokens. **Code Jay** automates this translation: the designer or developer selects elements in Figma and gets clean, production-ready code in their preferred stack.

## Stack and Technical Decisions

- **TypeScript** as the base for the entire plugin: types = contract with the Figma API.
- **Targeted code generation**: each technology (HTML/CSS, Tailwind, Astro, React) has its own generator that starts from a common intermediate model.
- **Speed as a requirement**: the plugin feels slow if it takes more than a few hundred ms; the entire pipeline is optimized for that budget.
- **Quality of generated code** over quantity: correct indentation, semantic names, no inline styles when a better alternative exists.

## Challenges Encountered

- **Interacting with an unfamiliar API** (Figma Plugin API): mapping its types to a custom model without excessive coupling.
- **Supporting multiple technologies** without duplicating logic.
- **Keeping the generated code readable**, not just functional.

## How I Solved the Challenges

- **Reading the complete official documentation** before writing anything serious.
- **Intermediate model** between the Figma tree and the final generator → complete decoupling between what is read and what is emitted.
- **Comparing the output against hand-written code** to iteratively refine formatting.

## What I Learned

- To **explore new APIs with discipline**: read first, then write.
- To **design pipelines** with clear stages (parse → normalize → emit).
- To **measure output quality** with reproducible criteria, not by intuition.

## Current Status

Published in the public Figma plugin directory.
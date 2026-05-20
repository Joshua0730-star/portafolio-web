---
lang: "en"
title: "Face Detection JS"
summary: "Face detection system in images and video using modern AI libraries and models in the browser. Practical exploration of client-side computer vision."
category: "other"
featured: false
status: "self-hosted"
technologies:
  - "JavaScript"
  - "face-api.js / TensorFlow.js"
  - "Computer Vision"
  - "Pre-trained Models"
  - "Canvas API"
revealCode: true
coverImage: "/projects/other_projects/face-detection-js/face-detection-cover.svg"
coverAlt: "Thematic illustration of face detection with bounding box and reference points"
gallery: []
keywords:
  - "computer vision"
  - "face detection"
  - "tensorflow.js"
  - "client-side AI"
publishedDate: 2024-03-20
---

## Problem it solves

Performing computer vision in the browser seems like magic and yet is accessible: with pre-trained models, faces, expressions, and facial landmarks can be detected **without sending data to the server**, maintaining user privacy.

## Stack and technical decisions

- **100% client-side inference**: no frame leaves the browser.
- **Pre-trained models** loaded once and reused throughout the session.
- **Detection loop synchronized with `requestAnimationFrame`** to avoid saturating the main thread.
- **Canvas API** to draw bounding boxes and landmarks over the live video.

## Challenges encountered

- **Latency and FPS**: detection on every frame is expensive; it was necessary to decide when to run it and when not.
- **Camera handling** with permissions, errors, and multiple devices.
- **Accuracy vs. cost**: more accurate models are slower; choosing the right model per use case.

## How I solved the challenges

- **Throttling the detection loop** (every N frames) instead of every frame.
- **Explicit fallback** when the camera is unavailable or the user denies permissions.
- **Quantitative comparison of models** by measuring real FPS before committing to one.

## What I learned

- To **integrate AI into the frontend** without turning it into a black box.
- To think of **privacy as an architectural advantage**, not as a restriction.
- To **measure client-side performance** with reproducible criteria.

## Current status

Self-hosted for personal use and experimentation.
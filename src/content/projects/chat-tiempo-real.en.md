---
lang: "en"
title: "Real-Time Chat"
summary: "Real-time messaging system focused on privacy, security, and modern protocols. Designed as an extensible base for experimenting with network architecture and bidirectional communication."
category: "featured"
featured: true
featuredOrder: 3
status: "self-hosted"
technologies:
  - "WebSockets"
  - "Node.js"
  - "Network Protocols"
  - "Transport Security"
  - "Client-Server Architecture"
  - "Real-time Events"
revealCode: false
coverImage: "/projects/destacados/Chat/chat-cover.svg"
coverAlt: "Thematic illustration of real-time chat with message bubbles"
gallery: []
keywords:
  - "realtime"
  - "websockets"
  - "messaging"
  - "network protocols"
  - "security"
publishedDate: 2024-07-10
---

## Problem it solves

Communication between close individuals today relies on centralized platforms with opaque data policies. This system explores a **self-hosted and minimalist** alternative: direct messaging between users, without intermediaries, focusing on privacy and control over the infrastructure.

## Stack and technical decisions

- **Bidirectional communication** over WebSockets for low latency.
- **Explicit protocols and rules** for handshake, authentication, and message format.
- **Event-driven model** on the server: each message is an event published to the correct subscribers.
- **Minimal state on the server**: the server routes, it does not interpret message content.

## Challenges encountered

- **Learning network protocols from the ground up**: TCP, message framing, flow control, reconnection, and backoff.
- **Security in transit**: identity validation, replay prevention, transport encryption.
- **Keeping the system simple** without sacrificing a scalable architecture.

## How I solved the challenges

- **Official documentation** and RFCs over superficial tutorials.
- **Small iterations with manual tests** of the client↔server flow before adding features.
- **Validating each decision** by consulting with AI and reviewing against primary sources —I decide, AI accelerates learning.

## What I learned

- How **protocols look on the inside**, not just as an imported library.
- Why **simple architecture wins** when the domain is complex.
- To think of **security as a cross-cutting concern**, not as a module added at the end.

## Current status

Self-hosted for personal use. Not publicly exposed due to privacy and security considerations while it evolves.
---
lang: "en"
title: "Video Summarizer"
summary: "Application that summarizes YouTube videos and transcribes them at high speed, integrated with AI to deliver actionable, learning-oriented summaries."
category: "other"
featured: false
status: "beta"
technologies:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
  - "React Hooks"
  - "AI Agents"
  - "Audio processing/transcription"
liveUrl: "https://resumen-videos.vercel.app/"
repoUrl: "https://github.com/Joshua0730-star/videore"
coverImage: "/projects/other_projects/resumen-videos/resumen-videos.png"
coverAlt: "Screenshot of Video Summarizer showing a summary generated from a YouTube video"
gallery: []
keywords:
  - "ai summarization"
  - "youtube"
  - "transcription"
  - "learning tools"
  - "agents"
publishedDate: 2024-08-12
---

## Problem it solves

A lot of valuable content lives in video, but time is finite. **Video Summarizer** converts a long YouTube video into a structured and searchable summary, ideal for faster learning and revisiting key points without re-watching the entire video.

## Stack and technical decisions

- **Next.js + TypeScript** to have SSR/SSG when needed and types throughout the flow.
- **Pipeline with clear stages**: get metadata → get transcription → summarize → structure output.
- **Task-specific AI Agents**: one model for transcribing, another for summarizing, another for extracting topics.
- **UI with streaming feedback**: the user sees the summary appear instead of waiting for a final block.

## Challenges encountered

- **Variety of sources**: not all videos have official transcription; it's necessary to decide when to transcribe and when to reuse.
- **Cost and latency of models**: the summary needs to be fast and cheap to be useful.
- **Summary quality**: a mediocre summary is worse than watching the video.

## How I solved the challenges

- **Aggressive caching** of already generated transcriptions and summaries.
- **Model selection based on task**: cheap and fast for classification, capable and expensive only when it adds quality.
- **Iterated prompt templates** comparing outputs against hand-made summaries.

## What I learned

- To **design pipelines with AI** as a first-class citizen, not as an afterthought.
- To **balance cost, latency, and quality** explicitly, not by default.
- To build UI that respects user **waiting time** with streaming and intermediate states.

## Current status

In public beta. Demo and source code available.
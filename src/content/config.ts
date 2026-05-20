import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    lang: z.enum(["es", "en"]).default("es"),
    title: z.string(),
    summary: z.string().max(220),
    category: z.enum(["featured", "other"]),
    featured: z.boolean().default(false),
    featuredOrder: z.number().optional(),
    status: z.enum(["production", "beta", "private", "self-hosted", "wip"]),
    technologies: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    revealCode: z.boolean().default(true),
    coverImage: z.string(),
    coverAlt: z.string(),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    keywords: z.array(z.string()).default([]),
    publishedDate: z.coerce.date(),
  }),
});

export const collections = { projects };

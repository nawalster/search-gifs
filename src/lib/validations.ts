import { z } from "zod";

export const GifImageDataSchema = z.object({
  height: z.string(),
  width: z.string(),
  size: z.string(),
  url: z.string(),
});

export const GifImagesSchema = z.object({
  original: GifImageDataSchema,
  fixed_height: GifImageDataSchema,
  fixed_width: GifImageDataSchema,
});

export const GifTypeSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  username: z.string(),
  images: GifImagesSchema,
});

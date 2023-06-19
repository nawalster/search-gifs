import {
  GifTypeSchema,
  GifImagesSchema,
  GifImageDataSchema,
} from "./validations";
import { API_KEY, API_URL, LIMIT } from "@/constants";
import { GifType } from "@/types";

export async function getTrendingGifs(offset: number = 0): Promise<GifType[]> {
  const res = await fetch(
    `${API_URL}/trending?api_key=${API_KEY}&limit=${LIMIT}&offset=${
      offset * LIMIT
    }`
  );

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  const data = await res.json();
  const validatedData = GifTypeSchema.array().parse(data.data);

  const uniqueGifs: GifType[] = [];

  // Filter out duplicates based on GIF Id (due to Trending API behaviour; can return duplicates)
  const gifIds = new Set<string>();
  validatedData.forEach((gif: GifType) => {
    if (!gifIds.has(gif.id)) {
      gifIds.add(gif.id);
      uniqueGifs.push(gif);
    }
  });

  return uniqueGifs;
}

export async function searchGifs(
  offset: number = 0,
  searchTerm: string
): Promise<GifType[]> {
  const res = await fetch(
    `${API_URL}/search?api_key=${API_KEY}&q=${searchTerm}&limit=${LIMIT}&offset=${
      offset * LIMIT
    }`
  );

  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  const data = await res.json();
  const validatedData = GifTypeSchema.array().parse(data.data);

  return validatedData;
}

export const getFavourites = async (ids: string[]): Promise<GifType[]> => {
  if (ids.length === 0) return [];

  const res = await fetch(`${API_URL}?api_key=${API_KEY}&ids=${ids}`);
  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  const data = await res.json();
  const validatedData = GifTypeSchema.array().parse(data.data);

  return validatedData;
};

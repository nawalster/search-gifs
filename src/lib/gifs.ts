import {
  GifTypeSchema,
  GifImagesSchema,
  GifImageDataSchema,
} from "./validations";
import { api_key, api_url, LIMIT } from "@/constants";
import { GifType } from "@/types";

export async function getTrendingGifs(offset: number = 0): Promise<GifType[]> {
  console.log("offset: ", offset);
  const trending_url = `${api_url}/trending?api_key=${api_key}&limit=${LIMIT}&offset=${
    offset * LIMIT
  }`;
  console.log(trending_url);
  const res = await fetch(
    `${api_url}/trending?api_key=${api_key}&limit=${LIMIT}&offset=${
      offset * LIMIT
    }`
  );

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  const data = await res.json();
  const validatedData = GifTypeSchema.array().parse(data.data);

  console.log(validatedData);

  const uniqueGifs: GifType[] = [];

  // Filter out duplicates based on GIF ID (due to Trending API behaviour; can return duplicates)
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
  console.log("searchTerm: ", searchTerm);
  const res = await fetch(
    `${api_url}/search?api_key=${api_key}&q=${searchTerm}&limit=${LIMIT}&offset=${
      offset * LIMIT
    }`
  );

  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  const data = await res.json();

  const validatedData = GifTypeSchema.array().parse(data.data);

  console.log(data);

  return validatedData;
}

export const getFavourites = async (ids: string[]): Promise<GifType[]> => {
  if (ids.length === 0) return [];
  console.log("gifIds: ", ids);

  const res = await fetch(`${api_url}?api_key=${api_key}&ids=${ids}`);
  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  const data = await res.json();

  console.log(data);
  const validatedData = GifTypeSchema.array().parse(data.data);

  return validatedData;
};

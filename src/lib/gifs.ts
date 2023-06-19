import { api_key, api_url, limit } from "@/constants";
import { GifType } from "@/types";

export async function getTrendingGifs(offset: number = 0): Promise<GifType[]> {
  console.log("offset: ", offset);
  const trending_url = `${api_url}/trending?api_key=${api_key}&limit=${limit}&offset=${
    offset * limit
  }`;
  console.log(trending_url);
  const res = await fetch(
    `${api_url}/trending?api_key=${api_key}&limit=${limit}&offset=${
      offset * limit
    }`
  );

  if (!res.ok) {
    throw new Error(`An error has occurred: ${res.status}`);
  }

  const data = await res.json();

  console.log(data);

  const uniqueGifs: GifType[] = [];

  // Filter out duplicates based on GIF ID
  const gifIds = new Set<string>();
  data.data.forEach((gif: GifType) => {
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
    `${api_url}/search?api_key=${api_key}&q=${searchTerm}&limit=${limit}&offset=${
      offset * limit
    }`
  );

  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  const data = await res.json();

  console.log(data);

  return data.data;
}

export const getFavourites = async (ids: string): Promise<GifType[]> => {
  console.log("gifIds: ", ids);

  const res = await fetch(`${api_url}?api_key=${api_key}&ids=${ids}`);
  if (!res.ok) {
    throw new Error(`An error has occured: ${res.status}`);
  }

  const data = await res.json();

  console.log(data);

  return data.data;
};

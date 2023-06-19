import { useEffect, useState } from "react";
import { GifType } from "@/types";

type FetchParams = { ids: string[] };

export default function useFavouritesFetch(
  { ids }: FetchParams,
  apiFunction: any,
  onDataLoaded: () => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [allItems, setAllItems] = useState<GifType[]>([]);

  const idsString = JSON.stringify(ids);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const items: GifType[] = await apiFunction(ids);
        setAllItems(items);
        onDataLoaded();
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [idsString, apiFunction]);

  return { loading, error, allItems, fetchItems: apiFunction };
}

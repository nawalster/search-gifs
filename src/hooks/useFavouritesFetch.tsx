import { useEffect, useState } from "react";
import { GifType } from "@/types";

type FetchParams = { ids: string[] };

export default function useFavouritesFetch(
  { ids }: FetchParams,
  apiFunction: any,
  onDataLoaded: () => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allItems, setAllItems] = useState<GifType[]>([]);
  console.log("ids: ", ids);
  const idsString = JSON.stringify(ids);

  useEffect(() => {
    setLoading(true);
    setError(false);

    apiFunction(ids)
      .then((items: GifType[]) => {
        setAllItems(items);
        setLoading(false);
        onDataLoaded();
      })
      .catch((e: Error) => {
        setError(true);
        setLoading(false);
      });
  }, [idsString, apiFunction]);

  return { loading, error, allItems, fetchItems: apiFunction };
}

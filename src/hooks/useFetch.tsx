import { EqualityChecker, FetchFunction } from "@/types";
import { useState, useEffect, useCallback } from "react";

interface FetchParams {
  query: string;
  page: number;
}

function useFetch<T>(
  { query, page }: FetchParams,
  fetchFunc: FetchFunction<T>,
  isEqual: EqualityChecker<T>,
  onDataLoaded: () => void
) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("send query in usefetch");
      console.log("query, ", query);
      const res = await fetchFunc(page, query);
      setItems((prev) => {
        // Filter out duplicates based on the custom equality checker
        const uniqueItems = res.filter((item) =>
          prev.every((prevItem) => !isEqual(prevItem, item))
        );

        return [...prev, ...uniqueItems];
      });

      setHasMore(true);
      setIsLoading(false);

      onDataLoaded();
    } catch (err) {
      console.log(err);
      setError(err as Error);
    }
  }, [fetchFunc, page, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, error, items, hasMore };
}

export default useFetch;

"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import useFetch from "@/hooks/useFetch";
import { getTrendingGifs, searchGifs } from "@/lib/gifs"; // Ensure both methods are exported from the same file or adjust the import
import { GifType } from "@/types";
import MasonryGrid from "./MasonryGrid";
import Loading from "./Loader";

const GifsGrid = ({ query }: { query?: string }) => {
  const [page, setPage] = useState(1);

  const fetchData = query ? searchGifs : getTrendingGifs;
  const fetchParams = { query: query || "", page };

  const { items, isLoading, error, hasMore } = useFetch(
    fetchParams,
    fetchData,
    (prevItem: GifType, newItem: GifType) => prevItem.id === newItem.id
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [observer]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen">
      <MasonryGrid images={items} lastItemRef={lastItemRef} />
    </div>
  );
};

export default GifsGrid;

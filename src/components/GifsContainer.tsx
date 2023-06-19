"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import useFetch from "@/hooks/useFetch";
import { getTrendingGifs, searchGifs } from "@/lib/gifs";
import { GifType } from "@/types";
import MasonryGrid from "./MasonryGrid";
import Loading from "./Loader";

const GifsGrid = ({ query }: { query?: string }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = query ? searchGifs : getTrendingGifs;
  const fetchParams = { query: query || "", page };

  const { items, error, hasMore } = useFetch(
    fetchParams,
    fetchData,
    (prevItem: GifType, newItem: GifType) => prevItem.id === newItem.id,
    () => setIsLoading(false)
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

  console.log(isLoading);

  return (
    <div className="h-screen">
      <MasonryGrid images={items} lastItemRef={lastItemRef} />
    </div>
  );
};

export default GifsGrid;

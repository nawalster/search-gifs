"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { LIMIT } from "@/constants";
import MasonryGrid from "./MasonryGrid";
import { GifType } from "@/types";
import useFavouritesFetch from "@/hooks/useFavouritesFetch";
import { getFavourites } from "@/lib/gifs";
import Loading from "./Loader";

const FavouritesContainer = () => {
  const [page, setPage] = useState(0);
  const [displayItems, setDisplayItems] = useState<GifType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const likedImages = JSON.parse(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("likedImages") || "[]"
      : "[]"
  );

  console.log("likedImages: ", likedImages);

  const query = useMemo(() => ({ ids: likedImages }), [likedImages]);

  const { allItems, error } = useFavouritesFetch(query, getFavourites, () =>
    setIsLoading(false)
  );

  console.log("all items length: ", allItems.length);

  useEffect(() => {
    const newItems = allItems.slice(page * LIMIT, (page + 1) * LIMIT);
    console.log(newItems);
    console.log(newItems.length);
    if (newItems.length > 0) {
      setDisplayItems((prevItems) => [...prevItems, ...newItems]);

      if ((page + 1) * LIMIT >= allItems.length) setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [page, allItems.length]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node && hasMore) observer.current.observe(node);
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
      <MasonryGrid images={displayItems} lastItemRef={lastItemRef} />
    </div>
  );
};

export default FavouritesContainer;

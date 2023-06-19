"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

  // const likedImages = JSON.parse(localStorage.getItem("likedImages") || "[]");
  const likedImages = JSON.parse(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("likedImages") || "[]"
      : "[]"
  );

  console.log("likedImages: ", likedImages);

  const query = useMemo(() => ({ ids: likedImages }), [likedImages]);

  const {
    allItems,
    loading: isLoading,
    error,
  } = useFavouritesFetch(query, getFavourites);

  // const {
  //   allItems,
  //   loading: isLoading,
  //   error,
  // } = useFavouritesFetch({ ids: likedImages }, getFavourites);
  console.log("all items length: ", allItems.length);

  useEffect(() => {
    const newItems = allItems.slice(page * 25, (page + 1) * 25);
    console.log(newItems.length);
    if (newItems.length > 0) {
      setDisplayItems((prevItems) => [...prevItems, ...newItems]);
      // Add items to the displayed list, and if there are no more items to add, setHasMore to false
      if ((page + 1) * 25 >= allItems.length) setHasMore(false);
    } else {
      setHasMore(false);
    }
  }, [page, allItems.length, hasMore]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node && hasMore) observer.current.observe(node); // Check if `hasMore` is true before starting to observe
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

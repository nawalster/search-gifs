import React, { useState, useEffect, useRef } from "react";

import { GRID_GAP } from "@/constants";
import { GifType } from "@/types";
import { masonryLayout } from "@/helpers/masonryLayout";
import GifCard from "./GifCard";
import ErrorBoundary from "./ErrorBoundary";

const MasonryGrid = ({
  images,
  lastItemRef,
}: {
  images: GifType[];
  lastItemRef: (node: HTMLDivElement) => void;
}) => {
  const [columns, setColumns] = useState(3);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const parentWidth = containerRef.current?.clientWidth;
      if (parentWidth) {
        setClientWidth(parentWidth); // Save the clientWidth in state
        const columnCount = Math.max(2, Math.floor(parentWidth / 200));
        setColumns(columnCount);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { imageArray } = masonryLayout(images, columns, GRID_GAP, clientWidth);

  useEffect(() => {
    const storedLikedImages = localStorage.getItem("likedImages");
    if (storedLikedImages) {
      setLikedImages(JSON.parse(storedLikedImages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedImages", JSON.stringify(likedImages));
  }, [likedImages]);

  const handleLike = (id: string) => {
    const isLiked = likedImages.includes(id);

    if (isLiked) {
      // Unlike image
      const updatedLikedImages = likedImages.filter(
        (likedId) => likedId !== id
      );
      setLikedImages(updatedLikedImages);
    } else {
      // Like image
      const updatedLikedImages = [...likedImages, id];
      setLikedImages(updatedLikedImages);
    }
  };

  const isImageLiked = (id: string) => {
    return likedImages.includes(id);
  };

  const columnWidth = containerRef.current?.clientWidth
    ? (containerRef.current?.clientWidth - (columns - 1) * GRID_GAP) / columns
    : 0;

  return (
    <div
      className="w-full grid gap-4 px-4 xs:gap-1 xs:px-2"
      ref={containerRef}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: `minmax(${columnWidth}px, auto)`,
        overflow: "hidden",
      }}
    >
      {imageArray.length > 0 ? (
        imageArray.map((image, index) => (
          <ErrorBoundary key={image.id} fallback={<p>Something went wrong</p>}>
            <GifCard
              key={image.id}
              image={image}
              isImageLiked={isImageLiked}
              handleLike={handleLike}
              isLast={index === imageArray.length - 1}
              columnWidth={columnWidth}
              lastItemRef={lastItemRef}
            />
          </ErrorBoundary>
        ))
      ) : (
        <div className="flex justify-center w-screen font-mono pt-10">
          {`No GIFS :(`}
        </div>
      )}
    </div>
  );
};

export default MasonryGrid;

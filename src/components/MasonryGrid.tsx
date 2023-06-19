import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { GifType } from "@/types";
import { masonryLayout } from "@/utils/masonryLayout";
import GifCard from "./GifCard";
import ErrorBoundary from "./ErrorBoundary";

const MasonryGrid = ({
  images,
  lastItemRef,
}: {
  images: GifType[];
  lastItemRef: (node: HTMLDivElement) => void;
}) => {
  const GAP = 25;
  const [columns, setColumns] = useState(3);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const titleRef = useRef<HTMLParagraphElement | null>(null);

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

  const { imageArray } = masonryLayout(images, columns, GAP, clientWidth);
  // ...

  useEffect(() => {
    // Get liked images from local storage
    const storedLikedImages = localStorage.getItem("likedImages");
    if (storedLikedImages) {
      setLikedImages(JSON.parse(storedLikedImages));
    }
  }, []);

  useEffect(() => {
    // Save liked images to local storage
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
    ? (containerRef.current?.clientWidth - (columns - 1) * GAP) / columns
    : 0;

  // return (
  //   <div
  //     className="w-full grid gap-4 px-4 xs:gap-1 xs:px-2"
  //     ref={containerRef}
  //     style={{
  //       gridTemplateColumns: `repeat(${columns}, 1fr)`,
  //       gridAutoRows: `minmax(${columnWidth}px, auto)`,
  //     }}
  //   >
  //     {imageArray.map((image, index) => (
  //       <div
  //         ref={index === imageArray.length - 1 ? lastItemRef : null}
  //         key={image.id}
  //         style={{
  //           gridRowEnd: `span ${Math.ceil(image.height / columnWidth)}`,
  //           position: "relative", // add relative position here
  //         }}
  //         className="flex justify-center"
  //       >
  //         <div
  //           className="absolute bottom-0 left-0 p-2 backdrop-brightness-50 flex justify-between w-full"
  //           style={{ zIndex: 40, height: "50px" }}
  //         >
  //           {image.username && (
  //             <p className="text-white text-xs font-mono mr-2 flex-grow-1 overflow-hidden">
  //               {image.username}
  //             </p>
  //           )}

  //           {image.username && <span className="pr-1 font-mono">|</span>}
  //           <div
  //             className="text-white text-xs font-mono flex-shrink-0 overflow-hidden"
  //             style={{ maxWidth: "calc(100% - 60px)" }} // Adjust the width as needed
  //           >
  //             {image.title}
  //           </div>
  //         </div>

  //         <Image src={image.image_url} width={300} height={300} alt="gif" />

  //         <button
  //           // className="absolute top-0 right-0 mx-7 my-2 sm:mx-2 sm:my-2"
  //           className="absolute top-0 right-0 mx-2 my-2"
  //           onClick={() => handleLike(image.id)}
  //           style={{ zIndex: 1 }} // ensure button is above the image
  //         >
  //           {isImageLiked(image.id) ? (
  //             <div>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 fill="red"
  //               >
  //                 <path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
  //               </svg>
  //             </div>
  //           ) : (
  //             <div>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 width="24"
  //                 height="24"
  //                 viewBox="0 0 24 24"
  //                 stroke="gray"
  //                 fill="white"
  //               >
  //                 <path d="M17.867 3.493l4.133 3.444v5.127l-10 8.333-10-8.334v-5.126l4.133-3.444 5.867 3.911 5.867-3.911zm.133-2.493l-6 4-6-4-6 5v7l12 10 12-10v-7l-6-5z" />
  //               </svg>
  //             </div>
  //           )}
  //         </button>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div
      className="w-full grid gap-4 px-4 xs:gap-1 xs:px-2"
      ref={containerRef}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: `minmax(${columnWidth}px, auto)`,
      }}
    >
      {imageArray.map((image, index) => (
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
      ))}
    </div>
  );
};

export default MasonryGrid;

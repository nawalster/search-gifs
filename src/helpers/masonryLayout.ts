import { GifType } from "@/types";

export const masonryLayout = (
  images: GifType[],
  columns: number,
  gap: number,
  clientWidth: number
) => {
  const columnWidth = (clientWidth - gap * (columns - 1)) / columns;

  const columnArray: number[] = [];
  for (let i = 0; i < columns; i++) {
    columnArray.push(0);
  }

  const imageArray = images.map((image) => {
    const shortestColumn = columnArray.indexOf(Math.min(...columnArray));

    const imagePosition = {
      image_url: image.images.fixed_width.url,
      id: image.id,
      title: image.title,
      username: image.username,
    };

    columnArray[shortestColumn] +=
      (parseInt(image.images.original.height) /
        parseInt(image.images.original.width)) *
        columnWidth +
      gap;

    return {
      ...imagePosition,
      width: columnWidth,
      height:
        (parseInt(image.images.original.height) /
          parseInt(image.images.original.width)) *
        columnWidth,
    };
  });

  return { imageArray };
};

export type GifType = {
  id: string;
  url: string;
  title: string;
  username: string;
  images: GifImages;
};

export type GifImages = {
  original: GifImageData;
  fixed_height: GifImageData;
  fixed_width: GifImageData;
};

export type GifImageData = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type EqualityChecker<T> = (prevItem: T, newItem: T) => boolean;

export type FetchFunction<T> = (...args: any[]) => Promise<T[]>;

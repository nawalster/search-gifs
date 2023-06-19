export type GifType = {
  id: string;
  url: string;
  title: string;
  username: string;
  embed_url: string;
  images: GifImages;
};
export type GifsType = {
  page: number;
  // results: GifType[]
};
// export type GifImages = {
//   fixed_height: FixedHeight;
// };
// export type FixedHeight = {
//   url: string;
// };

export type GifImages = {
  original: GifImageSize;
  fixed_height: GifImageSize;
  fixed_width: GifImageSize;
};

export type GifImageSize = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
};

export type EqualityChecker<T> = (prevItem: T, newItem: T) => boolean;

export type FetchFunction<T> = (...args: any[]) => Promise<T[]>;


export type Prettify<T> = { [K in keyof T]: T[K]; }

export interface ImageResponse {
  error?: Error;
  data: Blob;
}
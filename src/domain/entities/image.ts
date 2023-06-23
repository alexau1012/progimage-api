export interface Image {
  id: string;
  fileType: "jpeg" | "png" | "webp" | "gif" | "avif";
  buffer: Buffer;
}

type Ext = "jpeg" | "png" | "webp" | "gif" | "avif";

export interface Image {
  id: string;
  fileType: Ext;
  buffer: Buffer;
}

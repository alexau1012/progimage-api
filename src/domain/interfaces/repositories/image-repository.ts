import { Image } from "../../entities/image";

export interface ImageRepository {
  createImage: (
    buffer: Buffer,
    id: Image["id"],
    fileType: Image["fileType"]
  ) => Promise<Image>;
  getImage: (id: string) => Promise<Image | null>;
}

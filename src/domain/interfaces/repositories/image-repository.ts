import { Image } from "../../entities/image";

export interface ImageRepository {
  createImage: (buffer: Buffer, fileType: Image["fileType"]) => Promise<Image>;
  getImage: (id: string) => Promise<Image | null>;
  storeImage: (buffer: Buffer, filePath: string) => Promise<void>;
  convertImage: (
    image: Image,
    width: number | null,
    height: number | null,
    angle: number | undefined
  ) => Promise<Image>;
}

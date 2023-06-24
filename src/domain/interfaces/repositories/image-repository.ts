import { Image } from "../../entities/image";

export interface ImageRepository {
  createImage: (buffer: Buffer, fileType: Image["fileType"]) => Promise<Image>;
  storeImage: (buffer: Buffer, id: string) => Promise<void>;
  // getImage: (id: string, fileType: Image["fileType"]) => Promise<Image>;
  // processImage: (
  //   image: Image,
  //   width: number | null,
  //   height: number | null,
  //   angle: number | undefined
  // ) => Promise<Image>;
  getProcessedImage: (
    id: string,
    fileType: Image["fileType"],
    width: number | null,
    height: number | null,
    angle: number | undefined
  ) => Promise<Image>;
}

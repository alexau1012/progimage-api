import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { ImageDataSource } from "../../data/interfaces/image-data-source";
import { ImageRepository } from "../interfaces/repositories/image-repository";

export const imageRepository = (
  imageDataSource: ImageDataSource
): ImageRepository => {
  return {
    createImage: async (buffer, fileType) => {
      const id = uuidv4();
      const newBuffer = await sharp(buffer)[fileType]().toBuffer();

      return {
        id,
        fileType,
        buffer: newBuffer,
      };
    },
    storeImage: async (buffer, filename) => {
      return imageDataSource.storeImage(buffer, filename);
    },
    getImage: async (id) => {
      const data = await imageDataSource.getImage(id);

      if (!data) {
        return null;
      }

      const imageBuffer = await sharp(data.path).toBuffer();

      return {
        id,
        fileType: "png",
        path: data.path,
        buffer: imageBuffer,
      };
    },
    convertImage: async (image, width, height, angle) => {
      const resizedBuffer = await sharp(image.buffer)
        .resize(width, height)
        .rotate(angle)
        .toBuffer();
      return {
        ...image,
        buffer: resizedBuffer,
      };
    },
  };
};

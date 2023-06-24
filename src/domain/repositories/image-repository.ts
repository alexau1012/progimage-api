import sharp from "sharp";
import { v5 as uuidv5 } from "uuid";
import { ImageDataSource } from "../../data/interfaces/image-data-source";
import { ImageRepository } from "../interfaces/repositories/image-repository";

export const imageRepository = (
  imageDataSource: ImageDataSource
): ImageRepository => {
  return {
    createImage: async (buffer, fileType) => {
      const id = uuidv5(buffer, `${process.env.IMAGE_REPO_NAMESPACE}`);
      const newBuffer = await sharp(buffer)[fileType]().toBuffer();

      return {
        id,
        fileType,
        buffer: newBuffer,
      };
    },
    storeImage: async (buffer, id) => {
      return imageDataSource.storeImage(buffer, id);
    },
    // getImage: async (id, fileType) => {
    //   const orignalData = await imageDataSource.getImage(id);

    //   if (!orignalData) {
    //     throw Error("NOT_FOUND");
    //   }

    //   const formattedImageBuffer = await sharp(orignalData.buffer)
    //     [fileType]()
    //     .toBuffer();

    //   return {
    //     id,
    //     fileType,
    //     buffer: formattedImageBuffer,
    //   };
    // },
    // processImage: async (image, width, height, angle) => {
    //   const processedBuffer = await sharp(image.buffer)
    //     .resize(width, height)
    //     .rotate(angle)
    //     .toBuffer();
    //   return {
    //     ...image,
    //     buffer: processedBuffer,
    //   };
    // },
    getProcessedImage: async (id, fileType, width, height, angle) => {
      const orignalData = await imageDataSource.getImage(id);

      if (!orignalData) {
        throw Error("NOT_FOUND");
      }

      const processedImageBuffer = await sharp(orignalData.buffer)
        [fileType]()
        .resize(width, height)
        .rotate(angle)
        .toBuffer();

      return {
        id,
        fileType,
        buffer: processedImageBuffer,
      };
    },
  };
};

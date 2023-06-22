import sharp from "sharp";
import { ImageDataSource } from "../../data/interfaces/image-data-source";
import { ImageRepository } from "../interfaces/repositories/image-repository";

export const imageRepository = (
  imageDataSource: ImageDataSource
): ImageRepository => {
  return {
    createImage: async (buffer, id, fileType) => {
      const newBuffer = await sharp(buffer)[fileType]().toBuffer();
      const filename = `${id}.${fileType}`;
      const data = await imageDataSource.createImage(
        newBuffer,
        filename
      );
      return {
        id,
        fileType,
        path: data.path,
      };
    },
    getImage: async (id) => {
      const data = await imageDataSource.getImage(id);

      if (!data) {
        return null;
      }

      return {
        id,
        fileType: "png",
        path: data.path,
      };
    },
  };
};

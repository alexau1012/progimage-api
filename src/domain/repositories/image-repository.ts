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
    getProcessedImage: async (id, fileType, width, height, angle) => {
      const orignalData = await imageDataSource.getImage(id);

      if (!orignalData) {
        throw Error("NOT_FOUND");
      }

      const { buffer, fileType: orginalFileType } = orignalData;

      const validFileType =
        orginalFileType === "jpg" ? "jpeg" : orginalFileType;

      const newFileType = fileType || validFileType;

      const processedImageBuffer = await sharp(buffer)
        [newFileType]()
        .resize(width, height)
        .rotate(angle)
        .toBuffer();

      return {
        id,
        fileType: newFileType,
        buffer: processedImageBuffer,
      };
    },
  };
};

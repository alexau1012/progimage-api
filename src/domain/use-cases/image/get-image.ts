import sharp from "sharp";
import { v5 as uuidv5 } from "uuid";
import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { GetImageUseCase } from "../../interfaces/use-cases/image/get-image";

export const getImage = (imageRepository: ImageRepository): GetImageUseCase => {
  return async (id, fileType) => {
    const image = await imageRepository.getImage(id);

    if (image && fileType && image.fileType !== fileType) {
      const data = await sharp(image.path).toBuffer();
      const imageId = uuidv5(fileType, id);
      const newImage = await imageRepository.createImage(
        data,
        imageId,
        fileType
      );
      return newImage;
    }

    if (!image) {
      throw Error("Image not found.");
    }

    return image;
  };
};

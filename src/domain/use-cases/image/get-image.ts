import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { GetImageUseCase } from "../../interfaces/use-cases/image/get-image";

export const getImage = (imageRepository: ImageRepository): GetImageUseCase => {
  return async (id, fileType) => {
    const image = await imageRepository.getImage(id);

    if (fileType && image.fileType !== fileType) {
      const { buffer } = await imageRepository.createImage(
        image.buffer,
        fileType
      );

      return { id, fileType, buffer };
    }

    return image;
  };
};

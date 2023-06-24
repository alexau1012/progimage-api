import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { GetProcessedImageUseCase } from "../../interfaces/use-cases/image/get-processed-image";

export const getProcessedImage = (
  imageRepository: ImageRepository
): GetProcessedImageUseCase => {
  return async (id, fileType, width, height, angle) => {
    const image = await imageRepository.getProcessedImage(
      id,
      fileType,
      width,
      height,
      angle
    );

    return image;
  };
};

import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { ProcessImageUseCase } from "../../interfaces/use-cases/image/process-image";

export const processImage = (
  imageRepository: ImageRepository
): ProcessImageUseCase => {
  return async (image, width, height, angle) => {
    if (!width && !height && !angle) {
      return image;
    }
    return imageRepository.processImage(image, width, height, angle);
  };
};

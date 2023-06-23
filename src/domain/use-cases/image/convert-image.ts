import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { ConvertImageUseCase } from "../../interfaces/use-cases/image/convert-image";

export const convertImage = (
  imageRepository: ImageRepository
): ConvertImageUseCase => {
  return async (image, width, height, angle) => {
    if (!width && !height && !angle) {
      return image;
    }
    return imageRepository.convertImage(image, width, height, angle);
  };
};

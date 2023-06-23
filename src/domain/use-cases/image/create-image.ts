import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { CreateImageUseCase } from "../../interfaces/use-cases/image/create-image";

export const createImage = (
  imageRepository: ImageRepository
): CreateImageUseCase => {
  return async (data, fileType) => {
    const { id, buffer } = await imageRepository.createImage(data, fileType);

    const filename = `${id}.${fileType}`;
    await imageRepository.storeImage(buffer, filename);

    return id;
  };
};

import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { ImageRepository } from "../../interfaces/repositories/image-repository";
import { CreateImageUseCase } from "../../interfaces/use-cases/image/create-image";

export const createImage = (
  imageRepository: ImageRepository
): CreateImageUseCase => {
  return async (data, fileType) => {
    const imageId = fileType ? uuidv5(fileType, uuidv4()) : uuidv4();

    const { id } = await imageRepository.createImage(
      data,
      imageId,
      fileType
    );

    return id;
  };
};

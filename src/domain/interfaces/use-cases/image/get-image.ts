import { Image } from "../../../entities/image";

export interface GetImageUseCase {
  (id: string, fileType: Image["fileType"]): Promise<Image>;
}

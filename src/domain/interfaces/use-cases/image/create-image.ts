import { Image } from "../../../entities/image";

export type CreateImageUseCase = (
  data: Buffer,
  fileType: Image["fileType"]
) => Promise<Image["id"]>;

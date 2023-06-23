import { Image } from "../../../entities/image";

export interface ProcessImageUseCase {
  (
    image: Image,
    width: number | null,
    height: number | null,
    angle: number | undefined
  ): Promise<Image>;
}

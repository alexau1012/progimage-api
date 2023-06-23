import { Image } from "../../../entities/image";

export interface ConvertImageUseCase {
  (
    image: Image,
    width: number | null,
    height: number | null,
    angle: number | undefined
  ): Promise<Image>;
}

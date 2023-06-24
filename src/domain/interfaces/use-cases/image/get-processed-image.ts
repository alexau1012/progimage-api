import { Image } from "../../../entities/image";

export interface GetProcessedImageUseCase {
  (
    id: string,
    fileType: Image["fileType"],
    width: number | null,
    height: number | null,
    angle: number | undefined
  ): Promise<Image>;
}

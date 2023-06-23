import express, { Request, Response } from "express";
import path from "path";
import { validationResult } from "express-validator";
import { Image } from "../../domain/entities/image";
import { CreateImageUseCase } from "../../domain/interfaces/use-cases/image/create-image";
import { GetImageUseCase } from "../../domain/interfaces/use-cases/image/get-image";
import { ConvertImageUseCase } from "../../domain/interfaces/use-cases/image/convert-image";
import { uploadImageMiddleware } from "../middlewares/upload-image-middleware";
import { getImageValidator } from "../middlewares/validator-middleware";

const handleNaN = <T extends null | undefined>(
  value: number,
  replacement: T
) => {
  return isNaN(value) ? replacement : value;
};

export const ImageRouter = (
  createImageUseCase: CreateImageUseCase,
  getImageUseCase: GetImageUseCase,
  convertImageUseCase: ConvertImageUseCase
) => {
  const router = express.Router();

  router.post(
    "/",
    uploadImageMiddleware.single("upload"),
    async (request: Request, response: Response) => {
      let uid = "";
      if (request.file?.buffer) {
        const fileType = path
          .extname(request.file.originalname)
          .slice(1) as Image["fileType"];
        uid = await createImageUseCase(request.file.buffer, fileType);
      }
      response.statusCode = 201;
      response.json({ imageId: uid });
    }
  );

  router.get(
    "/:id",
    getImageValidator,
    async (request: Request, response: Response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).send(errors.mapped());
      }

      const id = request.params.id;
      const requestedFileType = request.query.filetype as Image["fileType"];
      const width = handleNaN(parseInt(request.query.width as string), null);
      const height = handleNaN(parseInt(request.query.height as string), null);
      const angle = handleNaN(
        parseInt(request.query.angle as string),
        undefined
      );

      const image = await getImageUseCase(id, requestedFileType);

      const convertedImage = await convertImageUseCase(
        image,
        width,
        height,
        angle
      );

      response.contentType(`image/${convertedImage.fileType}`);
      response.end(convertedImage.buffer);
    }
  );

  return router;
};

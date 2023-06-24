import express, { Request, Response } from "express";
import path from "path";
import { validationResult } from "express-validator";
import { Image } from "../../domain/entities/image";
import { CreateImageUseCase } from "../../domain/interfaces/use-cases/image/create-image";
import { GetProcessedImageUseCase } from "../../domain/interfaces/use-cases/image/get-processed-image";
import { uploadImageMiddleware } from "../middlewares/upload-image-middleware";
import { getImageValidations } from "../middlewares/validator-middleware";

const handleNaN = <T extends null | undefined>(
  value: number,
  replacement: T
) => {
  return isNaN(value) ? replacement : value;
};

export const ImageRouter = (
  createImageUseCase: CreateImageUseCase,
  getProcessedImageUseCase: GetProcessedImageUseCase
) => {
  const router = express.Router();

  router.post(
    "/",
    uploadImageMiddleware.single("upload"),
    async (request: Request, response: Response) => {
      if (!request.file?.buffer) {
        return response.status(400).send({ message: "File buffer missing" });
      }

      const fileType = path
        .extname(request.file.originalname)
        .slice(1) as Image["fileType"];

      try {
        const uid = await createImageUseCase(request.file.buffer, fileType);

        response.statusCode = 201;
        response.json({ imageId: uid });
      } catch (error) {
        response.sendStatus(500);
      }
    }
  );

  router.get(
    "/:id",
    getImageValidations,
    async (request: Request, response: Response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        console.log(errors.mapped());
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

      try {
        const image = await getProcessedImageUseCase(
          id,
          requestedFileType,
          width,
          height,
          angle
        );

        response.contentType(`image/${image.fileType}`);
        response.end(image.buffer);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          if (error.message === "NOT_FOUND") {
            return response.status(404).send({ message: error.message });
          }
        }
        response.sendStatus(500);
      }
    }
  );

  return router;
};

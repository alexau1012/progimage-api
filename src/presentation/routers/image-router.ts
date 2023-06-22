import express, { Request, Response } from "express";
import path from "path";
import { Image } from "../../domain/entities/image";
import { CreateImageUseCase } from "../../domain/interfaces/use-cases/image/create-image";
import { GetImageUseCase } from "../../domain/interfaces/use-cases/image/get-image";
import { uploadImageMiddleware } from "../middlewares/upload-image-middleware";
import { getImageValidator } from "../middlewares/validator-middleware";

export const ImageRouter = (
  createImageUseCase: CreateImageUseCase,
  getImageUseCase: GetImageUseCase
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

  router.get("/:id", getImageValidator, async (request: Request, response: Response) => {
    const id = request.params.id;
    const fileType = request.query.type as Image["fileType"];

    const { path } = await getImageUseCase(id, fileType);
    response.sendFile(path);
  });

  return router;
};

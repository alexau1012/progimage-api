import request from "supertest";
import { GetProcessedImageUseCase } from "../../../domain/interfaces/use-cases/image/get-processed-image";
import { CreateImageUseCase } from "../../../domain/interfaces/use-cases/image/create-image";
import server from "../../../server";
import { ImageRouter } from "../image-router";
import path from "path";
import { NextFunction, Request, Response } from "express";
import { Stream } from "stream";

jest.mock("multer", () => {
  const multer = () => ({
    single: () => {
      return (req: Request, res: Response, next: NextFunction) => {
        req.file = {
          originalname: "name.png",
          mimetype: "type",
          path: "url",
          buffer: Buffer.from("image"),
          fieldname: "name",
          encoding: "encoding",
          size: 0,
          stream: new Stream.Readable(),
          destination: "destination",
          filename: "filename",
        };
        return next();
      };
    },
  });
  multer.memoryStorage = () => jest.fn();
  return multer;
});

jest.mock("multer");

describe("Image Router", () => {
  const imageId = "123";

  const mockImage = {
    id: "123",
    buffer: Buffer.from("image"),
    fileType: "jpeg",
  } as const;

  const createImage: CreateImageUseCase = jest.fn().mockResolvedValue(imageId);
  const getProcessedImage: GetProcessedImageUseCase = jest
    .fn()
    .mockResolvedValue(mockImage);

  describe("GET /image/:id", () => {
    test("should return 200 with converted image downloaded", async () => {
      const [width, height, angle] = [200, 200, 30];

      const imageMiddleware = ImageRouter(createImage, getProcessedImage);
      server.use("/image", imageMiddleware);

      const response = await request(server).get(
        `/image/${mockImage.id}?filetype=${mockImage.fileType}&height=${height}&width=${width}&angle=${angle}`
      );

      expect(response.status).toBe(200);
      expect(getProcessedImage).toBeCalledTimes(1);
      expect(getProcessedImage).toBeCalledWith(
        mockImage.id,
        mockImage.fileType,
        width,
        height,
        angle
      );
      expect(response.body).toStrictEqual(mockImage.buffer);
    });
  });
  describe("POST /image", () => {
    test("should return 200 with uploaded image id", async () => {
      const imageMiddleware = ImageRouter(createImage, getProcessedImage);
      server.use("/image", imageMiddleware);

      const response = await request(server)
        .post("/image")
        .attach("image", path.resolve(__dirname, "./test-data/pizza.jpeg"));

      expect(response.status).toBe(201);
      expect(createImage).toBeCalledTimes(1);
      expect(createImage).toBeCalledWith(Buffer.from("image"), "png");
      expect(response.body).toStrictEqual({ imageId });
    });
  });
});

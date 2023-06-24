import "dotenv/config";
import { imageDataSource } from "./data/data-sources/image-data-source";
import { fileSystem } from "./data/data-sources/storage/file-system";
import { imageRepository } from "./domain/repositories/image-repository";
import { createImage } from "./domain/use-cases/image/create-image";
import { getProcessedImage } from "./domain/use-cases/image/get-processed-image";
import { ImageRouter } from "./presentation/routers/image-router";
import server from "./server";

const PORT = 8080;
const HOST = "0.0.0.0";

(async () => {
  const imageRepositoryImpl = imageRepository(imageDataSource(fileSystem));
  const imageMiddleware = ImageRouter(
    createImage(imageRepositoryImpl),
    getProcessedImage(imageRepositoryImpl)
  );

  server.use("/images", imageMiddleware);
  server.listen(PORT, HOST, () =>
    console.log(`Running on http://${HOST}:${PORT}`)
  );
})();

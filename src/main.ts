import "dotenv/config";
import { imageDataSource } from "./data/data-sources/image-data-source";
import { fileSystem } from "./data/data-sources/storage/file-system";
import { imageRepository } from "./domain/repositories/image-repository";
import { createImage } from "./domain/use-cases/image/create-image";
import { getImage } from "./domain/use-cases/image/get-image";
import { convertImage } from "./domain/use-cases/image/convert-image";
import { ImageRouter } from "./presentation/routers/image-router";
import server from "./server";

const PORT = 4000;

(async () => {
  const imageRepositoryImpl = imageRepository(imageDataSource(fileSystem));
  const imageMiddleware = ImageRouter(
    createImage(imageRepositoryImpl),
    getImage(imageRepositoryImpl),
    convertImage(imageRepositoryImpl)
  );

  server.use("/image", imageMiddleware);
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})();

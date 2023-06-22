import path from "path";
import { ImageDataSource } from "../interfaces/image-data-source";
import { StorageWrapper } from "../interfaces/storage-wrapper";

const outputDirectory = "./images";

export const imageDataSource = (storage: StorageWrapper): ImageDataSource => {
  const getFileType = (filePath: string) => {
    return path.extname(filePath).slice(1);
  };
  return {
    createImage: async (buffer, filename) => {
      const filePath = path.join(outputDirectory, filename);
      const file = await storage.insertFile(buffer, filePath, outputDirectory);

      return {
        path: file.path,
        fileType: getFileType(file.path),
      };
    },
    getImage: async (id) => {
      const file = await storage.findFile(
        path.join(outputDirectory, `${id}.png`)
      );

      if (!file) {
        return null;
      }

      return {
        path: file.path,
        fileType: getFileType(file.path),
      };
    },
  };
};
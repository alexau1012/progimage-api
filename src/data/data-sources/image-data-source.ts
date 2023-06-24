import path from "path";
import { ImageDataSource } from "../interfaces/image-data-source";
import { StorageWrapper } from "../interfaces/storage-wrapper";

const OUTPUT_DIRECTORY = "./images";

export const imageDataSource = (storage: StorageWrapper): ImageDataSource => {
  return {
    storeImage: async (buffer, filename) => {
      const filePath = path.join(OUTPUT_DIRECTORY, filename);
      await storage.insertFile(buffer, filePath, OUTPUT_DIRECTORY);
    },
    getImage: async (id) => {
      const file = await storage.findFile(path.join(OUTPUT_DIRECTORY, id));

      return file;
    },
  };
};

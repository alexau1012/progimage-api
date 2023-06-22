import sharp from "sharp";
import fs from "fs-extra";
import { StorageWrapper } from "../../interfaces/storage-wrapper";
import { join } from "path";

export const setupOutputDir = async (path: string) => {
  const exists = await fs.pathExists(path);
  if (!exists) {
    await fs.mkdir(path);
  }
};

export const fileSystem: StorageWrapper = {
  insertFile: async (buffer, filePath, directory) => {
    const aboluteDirectory = join(`${process.env.PWD}`, directory);
    const absoluteFilePath = join(`${process.env.PWD}`, filePath);
    const file = sharp(buffer);
    await setupOutputDir(aboluteDirectory);
    await file.toFile(absoluteFilePath);
    return { path: absoluteFilePath };
  },
  findFile: async (filePath) => {
    const absoluteFilePath = join(`${process.env.PWD}`, filePath);
    const fileExists = await fs.exists(absoluteFilePath);

    if (!fileExists) {
      return null;
    }

    return { path: absoluteFilePath };
  },
};

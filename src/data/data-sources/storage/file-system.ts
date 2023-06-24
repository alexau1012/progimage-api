import sharp from "sharp";
import fs from "fs-extra";
import { StorageWrapper } from "../../interfaces/storage-wrapper";
import { join } from "path";
import { fromFile } from "file-type";

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

    await setupOutputDir(aboluteDirectory);
    await sharp(buffer).toFile(absoluteFilePath);
  },
  findFile: async (filePath) => {
    const absoluteFilePath = join(`${process.env.PWD}`, filePath);
    const fileExists = await fs.exists(absoluteFilePath);

    if (!fileExists) {
      return null;
    }

    const fileType = await fromFile(absoluteFilePath);

    const fileExtension = fileType?.ext || "";

    const fileBuffer = await sharp(absoluteFilePath).toBuffer();

    return { buffer: fileBuffer, fileType: fileExtension };
  },
};

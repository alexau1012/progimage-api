import fs from "fs-extra";

export const setupOutputDir = async (path: string) => {
  const exists = await fs.pathExists(path);
  if (exists) {
    await fs.emptyDir(path);
    return;
  }
  await fs.mkdir(path);
};

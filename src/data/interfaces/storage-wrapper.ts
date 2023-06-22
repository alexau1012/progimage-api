type Data = {
  path: string;
};

export interface StorageWrapper {
  insertFile: <T extends Buffer, U>(
    fileData: T,
    filePath: string,
    directory: string
  ) => Promise<Data>;
  findFile: (filePath: string) => Promise<Data | null>;
}

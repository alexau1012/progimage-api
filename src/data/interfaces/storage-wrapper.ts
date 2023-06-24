type Data = {
  buffer: Buffer;
  fileType: string;
};

export interface StorageWrapper {
  insertFile: <T extends Buffer, U>(
    fileData: T,
    filePath: string,
    directory: string
  ) => Promise<void>;
  findFile: (filePath: string) => Promise<Data | null>;
}

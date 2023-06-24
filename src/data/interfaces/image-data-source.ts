type Data = {
  buffer: Buffer;
  fileType: string;
};

export interface ImageDataSource {
  storeImage: (buffer: Buffer, filename: string) => Promise<void>;
  getImage: (id: string) => Promise<Data | null>;
}

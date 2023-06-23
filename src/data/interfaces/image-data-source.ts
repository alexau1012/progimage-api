type Data = {
  path: string;
  fileType: string;
};

export interface ImageDataSource {
  storeImage: (buffer: Buffer, filename: string) => Promise<void>;
  getImage: (id: string) => Promise<Data | null>;
}

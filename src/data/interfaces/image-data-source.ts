type Data = {
  path: string;
  fileType: string;
};

export interface ImageDataSource {
  createImage: (buffer: Buffer, id: string) => Promise<Data>;
  getImage: (id: string) => Promise<Data | null>;
}

import { ImageDataSource } from "../../../data/interfaces/image-data-source";
import { imageRepository } from "../image-repository";

jest.mock("uuid", () => ({
  v5: () => "123",
}));

jest.mock("sharp", () => () => ({
  png: () => ({
    toBuffer: async () => Buffer.from("image-png"),
  }),
}));

describe("Image Repository", () => {
  const imageDataSource: ImageDataSource = {
    storeImage: jest.fn(),
    getImage: jest.fn(),
  };
  const mockImageRepository = imageRepository(imageDataSource);
  describe("Create Image", () => {
    test("should create image of different file type", async () => {
      const createdImage = await mockImageRepository.createImage(
        Buffer.from("image-jpeg"),
        "png"
      );
      expect(createdImage).toStrictEqual({
        id: "123",
        fileType: "png",
        buffer: Buffer.from("image-png"),
      });
    });
  });
});

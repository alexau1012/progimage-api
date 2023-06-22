import multer from "multer";

export const uploadImageMiddleware = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (_, file, callback) => {
    if (
      !file.originalname.match(
        `\.(${process.env.IMAGE_FILE_TYPES?.split(",").join("|")})$`
      )
    ) {
      return callback(new Error("Please upload a valid image file"));
    }
    callback(null, true);
  },
});

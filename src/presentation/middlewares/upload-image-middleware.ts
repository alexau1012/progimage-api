import multer from "multer";
import { validImageFileTypes } from "./validator-middleware";

export const uploadImageMiddleware = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (_, file, callback) => {
    if (!file.originalname.match(`\.(${validImageFileTypes.join("|")})$`)) {
      return callback(new Error("Please upload a valid image file"));
    }
    callback(null, true);
  },
});

import { query } from "express-validator";

export const getImageValidator = [
  query("filetype")
    .optional()
    .isString()
    .isIn(`${process.env.IMAGE_FILE_TYPES}`.split(","))
    .withMessage("Unknown file type."),
  query("width").optional().isInt().withMessage("Invalid width."),
  query("height").optional().isInt().withMessage("Invalid height."),
  query("angle").optional().isInt().withMessage("Invalid angle."),
];

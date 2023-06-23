import { query } from "express-validator";

export const validImageFileTypes = ["jpeg", "png", "webp", "gif", "avif"];

export const getImageValidations = [
  query("filetype")
    .optional()
    .isString()
    .isIn(validImageFileTypes)
    .withMessage("Unknown file type."),
  query("width").optional().isInt().withMessage("Invalid width."),
  query("height").optional().isInt().withMessage("Invalid height."),
  query("angle").optional().isInt().withMessage("Invalid angle."),
];

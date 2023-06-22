import { NextFunction, Request, Response } from "express";

export const getImageValidator = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const validFileTypes = `${process.env.IMAGE_FILE_TYPES}`.split(",");
  if (!validFileTypes.includes(request.query.type as string)) {
    response.status(400);
    throw new Error(`Unknown file type in query, must be ${validFileTypes}`);
  }
  next();
};

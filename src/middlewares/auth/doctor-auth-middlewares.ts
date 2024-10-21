import { NextFunction, Request, Response } from "express";

export const doctorMiddleware = {
  create: (req: Request, res: Response, next: NextFunction) => {
    // Implement logic to validate doctor data
    next();
  },
};

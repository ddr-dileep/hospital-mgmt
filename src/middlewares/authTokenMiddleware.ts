import { NextFunction, Request, Response } from "express";
import { API_RESPONSE } from "../utils/api-response";
import { verifyToken } from "../utils/token";

// auth middleware
export const authTokenMiddleware = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json(API_RESPONSE.ERROR({ message: "Token not provided" }));
  }

  try {
    const verified = await verifyToken(token);
    req.user = verified;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(API_RESPONSE.ERROR({ message: "Invalid token" }));
  }
};

import { NextFunction, Request, Response } from "express";
import { API_RESPONSE } from "../utils/api-response";

export const registerUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | any => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json(
      API_RESPONSE.ERROR({
        name: name ? undefined : "Name is required",
        email: email ? undefined : "Email is required",
        password: password ? undefined : "Password is required",
        message: "Please enter all required fields",
      })
    );
  }

  next();
};

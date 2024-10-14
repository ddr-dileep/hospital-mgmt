import { NextFunction, Request, Response } from "express";
import { API_RESPONSE } from "../../utils/api-response";

export const ownerMiddleware = {
  create: (req: Request, res: Response, next: NextFunction): any => {
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
  },
};

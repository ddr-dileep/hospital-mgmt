import { NextFunction, Request, Response } from "express";

export const userMiddlewares = {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        name: name ? undefined : "Name is required",
        email: email ? undefined : "Email is required",
        password: password ? undefined : "Password is required",
        message: "All fields are required",
      });
    }
    next();
  },
};

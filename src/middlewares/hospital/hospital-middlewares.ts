import { NextFunction, Request, Response } from "express";
import { API_RESPONSE } from "../../utils/api-response";

export const hospitalMiddleware = {
  create: (req: Request, res: Response, next: NextFunction): any => {
    const { name, address, phone, email } = req.body;

    if (!name || !address || !phone || !email) {
      return res.status(400).json(
        API_RESPONSE.ERROR({
          name: name ? undefined : "Name is required",
          address: address ? undefined : "Address is required",
          phone: phone ? undefined : "Phone is required",
          email: email ? undefined : "Email is required",
          message: "Please enter all required fields",
        })
      );
    }

    next();
  },
};

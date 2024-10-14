import { Request, Response } from "express";
import Owner from "../../models/auth/owner-model";
import { API_RESPONSE } from "../../utils/api-response";
import { hashPassword } from "../../utils/bcrypt";

export const ownerController = {
  ownerRegistration: async (req: Request, res: Response) => {
    try {
      const owner = new Owner({
        ...req.body,
        password: await hashPassword(req.body.password),
      });
      await owner.save();

      res.status(200).json(API_RESPONSE.SUCCESS({ owner }));
    } catch (error: any) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },
};

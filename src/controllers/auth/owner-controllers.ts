import { Request, Response } from "express";
import Owner from "../../models/auth/owner-model";
import { API_RESPONSE } from "../../utils/api-response";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/token";

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

  ownnerLogin: async (req: Request, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;

      const owner: any = await Owner.findOne({ email });
      if (!owner) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Invalid credentials" }));
      }

      const matchedPassword = await verifyPassword(password, owner?.password);
      if (!matchedPassword) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Invalid credentials" }));
      }

      const token = await generateToken({
        name: owner?.name,
        email: owner?.email,
        id: owner?._id,
        isDeleted: owner?.isDeleted,
      });

      res.status(200).send({ token, message: "Owner logged in successfully" });
    } catch (error) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },

  ownerInfo: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const owner = await Owner.findById(req.user.id).select(
        "name email createdAt isDeleted updatedAt"
      );

      if (!owner) {
        return res
          .status(404)
          .json(API_RESPONSE.ERROR({ message: "Owner not found" }));
      }

      if (req.user.isDeleted) {
        return res.status(403).json(
          API_RESPONSE.ERROR({
            message: "Owner account is deleted",
          })
        );
      }

      res.status(200).json(API_RESPONSE.SUCCESS({ owner }));
    } catch (error: any) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },
};

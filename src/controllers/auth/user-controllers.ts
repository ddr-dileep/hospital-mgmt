import { Request, Response } from "express";
import User from "../../models/auth/user-model";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import { API_RESPONSE } from "../../utils/api-response";
import { generateToken } from "../../utils/token";

export const userControllers = {
  register: async (req: Request, res: Response) => {
    try {
      const user = new User({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      await user.save();

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          user,
          message: "User registered successfully",
        })
      );
    } catch (error: any) {
      res.status(400).json(API_RESPONSE.SUCCESS(error));
    }
  },

  login: async (req: Request, res: Response): Promise<any> => {
    try {
      const user: any = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR("Invalid email or password"));
      }

      const matchedPassword = await verifyPassword(
        req.body.password,
        user.password
      );

      if (!matchedPassword) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR("Invalid email or password"));
      }

      const token = await generateToken({
        name: user.name,
        email: user.email,
        id: user._id,
      });

      res.status(200).send({ token, message: "User logged in successfully" });
    } catch (error: any) {
      res.status(400).json(API_RESPONSE.SUCCESS(error));
    }
  },
};

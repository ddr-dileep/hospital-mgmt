import { Request, Response } from "express";
import Admin from "../../models/auth/admin-model";
import Owner from "../../models/auth/owner-model";
import { API_RESPONSE } from "../../utils/api-response";
import Hospital from "../../models/hospital/hospital-model";
import { hashPassword, verifyPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/token";

export const adminControllers = {
  getAdmins: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const owner = await Owner.findById(req.user.id);

      if (!owner) {
        return res
          .status(404)
          .json(
            API_RESPONSE.ERROR({ message: "Not authorised to fetch admin" })
          );
      }

      const admins = await Admin.find();
      res.status(200).json({
        count: admins.length,
        admins,
        message: "Admins fetched successfully",
      });
    } catch (error) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },

  createAdmin: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const hospital = await Hospital.findById(req?.params?.hospitalId);

      if (!hospital) {
        return res
          .status(404)
          .json(API_RESPONSE.ERROR({ message: "Hospital is not exits" }));
      }

      if (hospital?.isDeleted) {
        return res
          .status(403)
          .json(
            API_RESPONSE.ERROR({ message: "Hospital is deleted/not fount" })
          );
      }

      const admin = new Admin({
        ...req.body,
        password: await hashPassword(req.body.password),
        createdByUser: "Owner",
        createdBy: req.user.id,
        hospital: hospital?._id,
      });

      await admin.save();
      res.send(
        API_RESPONSE.SUCCESS({
          admin,
          password: undefined,
          message: "Admin created successfully",
        })
      );
    } catch (error) {
      res.status(501).json(API_RESPONSE.ERROR(error));
    }
  },

  adminLogin: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const { email, password } = req.body;

      const admin: any = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Invalid credentials" }));
      }

      const matchedPassword = await verifyPassword(password, admin?.password);
      if (!matchedPassword) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Invalid credentials" }));
      }

      const token = await generateToken({
        name: admin?.name,
        email: admin?.email,
        id: admin?._id,
        isDeleted: admin?.isDeleted,
      });

      res.status(200).send({ token, message: "Admin logged in successfully" });
    } catch (error) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },

  adminInfo: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const admin: any = await Admin.findById(req.user.id)
        .populate({
          path: "hospital",
          select: "name address isDeleted",
        })
        .select("-password -otp -__v -updatedAt -createdAt")
        .populate({
          path: "createdBy",
          select: "name email isDeleted profilePicture",
        });
      if (!admin) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Account not found" }));
      }

      if (admin.isDeleted) {
        return res
          .status(403)
          .json(API_RESPONSE.ERROR({ message: "Account is not active" }));
      }

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          user: admin,
          message: `Welcome ${admin?.name}`,
        })
      );
    } catch (error) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },

  updateInfo: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const user = await Admin.findById(req.user.id);
      if (!user) {
        return res
          .status(401)
          .json(
            API_RESPONSE.ERROR({ message: "Not authorized to update info" })
          );
      }

      if (user.isDeleted) {
        return res
          .status(403)
          .json(API_RESPONSE.ERROR({ message: "Account not active" }));
      }

      // update the admin
      req.body.password = undefined; // don't need to update the password
      const updatedUser = await Admin.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res
          .status(400)
          .json(API_RESPONSE.ERROR({ message: "Invalid request" }));
      }

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          user: updatedUser,
          message: "User updated successfully",
        })
      );
    } catch (error) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },
};

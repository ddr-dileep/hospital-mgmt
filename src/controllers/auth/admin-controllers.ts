import { Request, Response } from "express";
import Admin from "../../models/auth/admin-model";
import Owner from "../../models/auth/owner-model";
import { API_RESPONSE } from "../../utils/api-response";

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
};

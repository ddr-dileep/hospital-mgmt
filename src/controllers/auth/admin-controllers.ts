import { Request, Response } from "express";
import Admin from "../../models/auth/admin-model";
import Owner from "../../models/auth/owner-model";
import { API_RESPONSE } from "../../utils/api-response";
import Hospital from "../../models/hospital/hospital-model";

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

      console.log("hospial", hospital);

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
        createdByUser: "Owner",
        createdBy: req.user.id,
        hospital: hospital?._id,
      });

      await admin.save();
      res.send(API_RESPONSE.SUCCESS({ admin }));
    } catch (error) {
      res.status(500).json(API_RESPONSE.ERROR(error));
    }
  },
};

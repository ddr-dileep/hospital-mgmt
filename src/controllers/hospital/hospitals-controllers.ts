import { Request, Response } from "express";
import { API_RESPONSE } from "../../utils/api-response";
import Owner from "../../models/auth/owner-model";
import Hospital from "../../models/hospital/hospital-model";

export const hospitalController = {
  createHospital: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const owner = await Owner.findById(req.user.id);
      if (!owner) {
        return res
          .status(401)
          .json(
            API_RESPONSE.ERROR({ message: "Not authorized to add Hospital." })
          );
      }
      if (!owner?.isDeleted) {
        return res
          .status(403)
          .json(API_RESPONSE.ERROR({ message: "Owner account is deleted" }));
      }

      const hospital = new Hospital({
        ...req.body,
        createdBy: owner._id,
        updatedBy: owner._id,
      });

      await hospital.save();

      res
        .status(201)
        .json({ hospital, message: "Hospital created successfully" });
    } catch (e) {
      res.status(500).json(API_RESPONSE.ERROR(e));
    }
  },

  getHospitals: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const hospitals = await Hospital.find()
        .populate("createdBy", "name")
        .select("name address phone email speciliation");

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          count: hospitals?.length,
          hospitals,
          message: "Hospitals featched successfully",
        })
      );
    } catch (e) {
      res.status(500).json(API_RESPONSE.ERROR(e));
    }
  },

  getHospitalById: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const hospital = await Hospital.findById(req.params.hospitalId).populate(
        "createdBy",
        "name email profilePicture"
      );
      if (!hospital) {
        return res
          .status(404)
          .json(API_RESPONSE.ERROR({ message: "Hospital not found" }));
      }
      res.status(200).json(
        API_RESPONSE.SUCCESS({
          hospital,
          message: "Hospital fetched successfully",
        })
      );
    } catch (e) {
      res.status(500).json(API_RESPONSE.ERROR(e));
    }
  },

  updateHospital: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const owner = await Owner.findById(req.user.id);
      if (!owner) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Not authorized to update." }));
      }
      if (!owner?.isDeleted) {
        return res
          .status(403)
          .json(API_RESPONSE.ERROR({ message: "Owner account is deleted" }));
      }

      const hospital = await Hospital.findByIdAndUpdate(
        req.params.hospitalId,
        req.body,
        { new: true, runValidators: true }
      );

      if (!hospital) {
        return res
          .status(404)
          .json(API_RESPONSE.ERROR({ message: "Hospital not found" }));
      }

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          hospital,
          message: "Hospital updated successfully",
        })
      );
    } catch (e) {
      res.status(500).json(API_RESPONSE.ERROR(e));
    }
  },

  deleteHospital: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const owner = await Owner.findById(req.user.id);
      if (!owner) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Not authorized to delete." }));
      }
      if (!owner?.isDeleted) {
        return res
          .status(403)
          .json(API_RESPONSE.ERROR({ message: "Owner account is deleted" }));
      }
      const hospital = await Hospital.findByIdAndUpdate(
        req.params.hospitalId,
        { isDeleted: true },
        { new: true }
      );

      if (!hospital) {
        return res
          .status(404)
          .json(API_RESPONSE.ERROR({ message: "Hospital not found" }));
      }

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          hospital,
          message: "Hospital deleted successfully",
        })
      );
    } catch (e) {
      res.status(500).json(API_RESPONSE.ERROR(e));
    }
  },

  restoreHospital: async (req: Request | any, res: Response): Promise<any> => {
    try {
      const owner = await Owner.findById(req.user.id);
      if (!owner) {
        return res
          .status(401)
          .json(API_RESPONSE.ERROR({ message: "Not authorized to restore." }));
      }
      if (!owner?.isDeleted) {
        return res
          .status(403)
          .json(API_RESPONSE.ERROR({ message: "Owner account is deleted" }));
      }
      const hospital = await Hospital.findByIdAndUpdate(
        req.params.hospitalId,
        { isDeleted: false },
        { new: true }
      );
      if (!hospital) {
        return res
          .status(404)
          .json(API_RESPONSE.ERROR({ message: "Hospital not found" }));
      }
      res.status(200).json(
        API_RESPONSE.SUCCESS({
          hospital,
          message: "Hospital restored successfully",
        })
      );
    } catch (e) {
      res.status(500).json(API_RESPONSE.ERROR(e));
    }
  },
};

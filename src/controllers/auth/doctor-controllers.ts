import { Request, Response } from "express";
import { API_RESPONSE } from "../../utils/api-response";
import Doctor from "../../models/auth/doctor-model";
import { hashPassword } from "../../utils/bcrypt";

export const doctorController = {
  createDoctor: async (req: Request, res: Response) => {
    try {
      const newDoctor = new Doctor({
        ...req.body,
        password: await hashPassword(req.body?.password),
      });

      await newDoctor.save();

      const doctor = newDoctor;
      doctor.password = undefined;

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          doctor,
          message: "Doctor added successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSE.ERROR(error));
    }
  },

  getAllDoctors: async (req: Request, res: Response) => {
    try {
      const { hospitalId } = req.params;
      const {
        name,
        email,
        specialization,
        experience,
        contactNumber,
        isDeleted,
        hospital,
      } = req.query;

      const filter: any = {};

      if (hospitalId) filter.hospitals = hospitalId;
      if (name) filter.name = { $regex: new RegExp(name as string, "i") };
      if (email) filter.email = email;
      if (specialization) filter.specialization = specialization;
      if (experience) filter.experience = experience;
      if (contactNumber) filter.contactNumber = contactNumber;
      if (isDeleted) filter.isDeleted = isDeleted === "true";
      if (hospital) filter.hospitals = hospital;

      const doctors = await Doctor.find(filter).populate("hospitals");

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          count: doctors.length,
          doctors,
          message: "Doctor fetched successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSE.ERROR(error));
    }
  },

  getDoctorById: async (req: Request, res: Response): Promise<any> => {
    try {
      const doctor = await Doctor.findById(req.params.doctorId).populate(
        "hospitals"
      );
      if (!doctor) {
        return res
          .status(404)
          .json(API_RESPONSE.ERROR({ message: "Doctor not found" }));
      }

      res.status(200).json(
        API_RESPONSE.SUCCESS({
          doctor,
          message: "Doctor fetched successfully",
        })
      );
    } catch (error) {
      res.status(400).json(API_RESPONSE.ERROR(error));
    }
  },
};

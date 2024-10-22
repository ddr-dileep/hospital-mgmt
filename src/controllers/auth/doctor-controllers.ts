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
      doctor.password = undefined; // Remove password from response before sending back to client

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

  getDoctors: () => {
    // Implement doctor retrieval logic here
  },

  getDoctorById: () => {
    // Implement doctor retrieval by ID logic here
  },
};

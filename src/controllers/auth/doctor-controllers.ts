import { Request, Response } from "express";
import { API_RESPONSE } from "../../utils/api-response";

export const doctorController = {
  createDoctor: (req: Request, res: Response) => {
    try {
      // Implement doctor creation logic here
      res.status(200).json(API_RESPONSE.SUCCESS({ check: true }));
    } catch (error) {}
  },
  getDoctors: () => {
    // Implement doctor retrieval logic here
  },
  getDoctorById: () => {
    // Implement doctor retrieval by ID logic here
  },
};

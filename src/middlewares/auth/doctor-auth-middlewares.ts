import { NextFunction, Request, Response } from "express";
import { API_RESPONSE } from "../../utils/api-response";

export const doctorMiddleware = {
  create: (req: Request, res: Response, next: NextFunction): any => {
    const { name, email, password, contactNumber, experience, specialization } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !contactNumber ||
      !experience ||
      !specialization
    ) {
      return res.status(403).json(
        API_RESPONSE.ERROR({
          message: "All fields are required",
          name: name ? undefined : "Name is required",
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
          contactNumber: contactNumber ? undefined : "Contact is required",
          experience: experience ? undefined : "Experience is required",
          specialization: specialization
            ? undefined
            : "Specialization is required",
        })
      );
    }
    next();
  },

  getAllDoctorsOfHospital: (
    req: Request,
    res: Response,
    next: NextFunction
  ): any => {
    const { hospitalId } = req.params;

    if (!hospitalId) {
      return res.status(403).json(
        API_RESPONSE.ERROR({
          message: "hospital's Id is required",
        })
      );
    }
    next();
  },

  getDoctorById: (req: Request, res: Response, next: NextFunction): any => {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(403).json(
        API_RESPONSE.ERROR({
          message: "Doctor's Id is required",
        })
      );
    }
    next();
  },
};

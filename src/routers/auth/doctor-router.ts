import { Router } from "express";
import { doctorMiddleware } from "../../middlewares/auth/doctor-auth-middlewares";
import { doctorController } from "../../controllers/auth/doctor-controllers";
import { authTokenMiddleware } from "../../middlewares/auth/authTokenMiddleware";

const doctorRouter = Router();
export default doctorRouter;

doctorRouter.post(
  "/create",
  doctorMiddleware.create,
  doctorController.createDoctor
);

doctorRouter.get("/get-all-doctors", doctorController.getAllDoctors);

doctorRouter.get(
  "/get-all-doctors/:hospitalId",
  doctorMiddleware.getAllDoctorsOfHospital,
  doctorController.getAllDoctors
);

doctorRouter.get(
  "/get-doctor/:doctorId",
  doctorMiddleware.getDoctorById,
  doctorController.getDoctorById
);

doctorRouter.patch(
  "/update/:doctorId",
  authTokenMiddleware,
  doctorController.updateDoctor
);

doctorRouter.delete(
  "/delete/:doctorId",
  authTokenMiddleware,
  doctorController.deleteDoctor
);

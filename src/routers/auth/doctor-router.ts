import { Router } from "express";
import { doctorMiddleware } from "../../middlewares/auth/doctor-auth-middlewares";
import { doctorController } from "../../controllers/auth/doctor-controllers";

const doctorRouter = Router();
export default doctorRouter;

doctorRouter.post(
  "/create",
  doctorMiddleware.create,
  doctorController.createDoctor
);

doctorRouter.get("/get-all-doctors", doctorController.getAllDoctors);

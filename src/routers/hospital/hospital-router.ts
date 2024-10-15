import { Router } from "express";
import { hospitalController } from "../../controllers/hospital/hospitals-controllers";
import { hospitalMiddleware } from "../../middlewares/hospital/hospital-middlewares";
import { authTokenMiddleware } from "../../middlewares/authTokenMiddleware";

const hospitalRouter = Router();
export default hospitalRouter;

hospitalRouter.post(
  "/create",
  hospitalMiddleware.create,
  authTokenMiddleware,
  hospitalController.createHospital
);

hospitalRouter.get(
  "/get-hospitals",
  authTokenMiddleware,
  hospitalController.getHospitals
);
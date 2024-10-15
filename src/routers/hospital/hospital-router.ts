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

hospitalRouter.get("/get-hospitals", hospitalController.getHospitals);

hospitalRouter.get(
  "/get-hospital/:hospitalId",
  hospitalController.getHospitalById
);

hospitalRouter.patch(
  "/update/:hospitalId",
  authTokenMiddleware,
  hospitalController.updateHospital
);

hospitalRouter.delete(
  "/delete/:hospitalId",
  authTokenMiddleware,
  hospitalController.deleteHospital
);

hospitalRouter.delete(
  "/restore/:hospitalId",
  authTokenMiddleware,
  hospitalController.restoreHospital
);

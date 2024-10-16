import { Router } from "express";
import { adminControllers } from "../../controllers/auth/admin-controllers";
import { authTokenMiddleware } from "../../middlewares/auth/authTokenMiddleware";
import { adminMiddleware } from "../../middlewares/auth/admin-auth-middleware";

const adminRouter = Router();
export default adminRouter;

adminRouter.get("/get-admins", authTokenMiddleware, adminControllers.getAdmins);

adminRouter.post(
  "/create/:hospitalId",
  adminMiddleware.create,
  authTokenMiddleware,
  adminControllers.createAdmin
);

adminRouter.post("/login", adminMiddleware.login, adminControllers.adminLogin);

adminRouter.get("/user-info", authTokenMiddleware, adminControllers.adminInfo);

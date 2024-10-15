import { Router } from "express";
import { adminControllers } from "../../controllers/auth/admin-controllers";
import { authTokenMiddleware } from "../../middlewares/auth/authTokenMiddleware";

const adminRouter = Router();
export default adminRouter;

adminRouter.get("/get-admins", authTokenMiddleware, adminControllers.getAdmins);

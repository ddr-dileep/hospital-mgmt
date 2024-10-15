import { Router } from "express";
import userRouter from "./auth/user-router";
import ownerRouter from "./auth/owner-auth";
import hospitalRouter from "./hospital/hospital-router";
import adminRouter from "./auth/admin-router";

const rootRouter = Router();

rootRouter.use("/auth", userRouter);

// auth routes
rootRouter.use("/owner", ownerRouter);
rootRouter.use("/admin", adminRouter);

// hospital routes
rootRouter.use("/hospital", hospitalRouter);

export default rootRouter;

import { Router } from "express";
import ownerRouter from "./auth/owner-auth";
import hospitalRouter from "./hospital/hospital-router";
import adminRouter from "./auth/admin-router";
import doctorRouter from "./auth/doctor-router";
import userRouter from "./auth/user-router";

const rootRouter = Router();

// auth routes
rootRouter.use("/owner", ownerRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/doctor", doctorRouter);
rootRouter.use("/user", userRouter);

// hospital routes
rootRouter.use("/hospital", hospitalRouter);

export default rootRouter;

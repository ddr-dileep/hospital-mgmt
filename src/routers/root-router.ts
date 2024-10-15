import { Router } from "express";
import userRouter from "./auth/user-router";
import ownerRouter from "./auth/owner-auth";
import hospitalRouter from "./hospital/hospital-router";

const rootRouter = Router();

rootRouter.use("/auth", userRouter);

// owner routes
rootRouter.use("/owner", ownerRouter);

// hospital routes
rootRouter.use("/hospital",  hospitalRouter);

export default rootRouter;

import { Router } from "express";
import userRouter from "./auth/user-router";
import ownerRouter from "./auth/owner-auth";

const rootRouter = Router();

rootRouter.use("/auth", userRouter);

// owner routes
rootRouter.use("/owner", ownerRouter);

export default rootRouter;

import { Router } from "express";
import userRouter from "./auth/user-router";

const rootRouter = Router();

rootRouter.use("/auth", userRouter);

export default rootRouter;

import { Router } from "express";
import userRouter from "./user-router";

const rootRouter = Router();

rootRouter.use("/user", userRouter);

export default rootRouter;

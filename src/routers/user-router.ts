import { Router } from "express";
import { registerUserController } from "../controllers/user-controllers";
import { registerUserMiddleware } from "../middlewares/user-middlewares";

const userRouter = Router();

userRouter.post("/register", registerUserMiddleware, registerUserController);

export default userRouter;

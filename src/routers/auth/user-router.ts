import { Router } from "express";
import { registerUserController } from "../../controllers/auth/user-controllers";
import { registerUserMiddleware } from "../../middlewares/auth-middlewares";

const userRouter = Router();

userRouter.post("/register", registerUserMiddleware, registerUserController);

export default userRouter;

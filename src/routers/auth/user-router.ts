import { Router } from "express";
import { userMiddlewares } from "../../middlewares/auth/user-auth-middleware";
import { userControllers } from "../../controllers/auth/user-controllers";

const userRouter = Router();
export default userRouter;

userRouter.post(
  "/register",
  userMiddlewares.register,
  userControllers.register
);

userRouter.post("/login", userMiddlewares.login, userControllers.login);

import { Router } from "express";
import { ownerController } from "../../controllers/auth/owner-controllers";
import { ownerMiddleware } from "../../middlewares/auth/owner-auth-middleware";

const ownerRouter = Router();
export default ownerRouter;

ownerRouter.post(
  "/create",
  ownerMiddleware.create,
  ownerController.ownerRegistration
);

ownerRouter.post("/login", ownerMiddleware.login, ownerController.ownnerLogin);

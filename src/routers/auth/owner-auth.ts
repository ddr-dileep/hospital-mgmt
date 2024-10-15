import { Router } from "express";
import { ownerController } from "../../controllers/auth/owner-controllers";
import { ownerMiddleware } from "../../middlewares/auth/owner-auth-middleware";
import { authTokenMiddleware } from "../../middlewares/authTokenMiddleware";

const ownerRouter = Router();
export default ownerRouter;

ownerRouter.post(
  "/create",
  ownerMiddleware.create,
  ownerController.ownerRegistration
);

ownerRouter.post("/login", ownerMiddleware.login, ownerController.ownnerLogin);

ownerRouter.get(
  "/get-owners-info",
  authTokenMiddleware,
  ownerController.ownerInfo
);

ownerRouter.patch("/update", authTokenMiddleware, ownerController.update);

ownerRouter.delete("/delete", authTokenMiddleware, ownerController.delete);

import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { uploader } from "../services/uploader";

export class UserRouter {
  private router: Router;
  private userController: UserController;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.userController = new UserController();
    this.userMiddleware = new UserMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      this.userMiddleware.verifyToken,
      this.userMiddleware.verifyAdmin,
      this.userController.getUsers
    );
    this.router.get(
      "/profile",
      this.userMiddleware.verifyToken,
      this.userController.getUserId
    );
    this.router.post("/", this.userController.addUser);
    this.router.patch(
      "/avatar",
      this.userMiddleware.verifyToken,
      uploader("diskStorage", "avatar-", "/avatar").single("file"),
      this.userController.editAvatar
    );

    this.router.patch("/:id", this.userController.editUser);
    this.router.delete("/:id", this.userController.deleteUser);
  }

  getRouter(): Router {
    return this.router;
  }
}

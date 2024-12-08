import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  // private authMiddleware: AuthMiddleware;

  constructor() {
    this.authController = new AuthController();
    // this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/register", this.authController.registerUser);
    this.router.post("/login", this.authController.loginUser);
    
    this.router.patch("/verify/:token", this.authController.verifyUser);
  }

  getRouter(): Router {
    return this.router;
  }
}

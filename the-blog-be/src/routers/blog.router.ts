import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";

export class BlogRouter {
  private router: Router;
  private blogController: BlogController;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.blogController.getBlogs);

    this.router.get("/:slug", this.blogController.getBlogSlug);
  }

  getRouter(): Router {
    return this.router;
  }
}

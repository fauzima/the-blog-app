import express, { Request, Response, Application } from "express";
import cors from "cors";
import { UserRouter } from "./routers/user.router";
import { BlogRouter } from "./routers/blog.router";
import { AuthRouter } from "./routers/auth.router";
import cookieParser from "cookie-parser";

const PORT: number = 1337;

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
  })
);
app.use(cookieParser());

const userRouter = new UserRouter();
const blogRouter = new BlogRouter();
const authRouter = new AuthRouter();

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Hello! Welcome to my API.");
});

app.use("/api/user", userRouter.getRouter());
app.use("/api/blog", blogRouter.getRouter());
app.use("/api/auth", authRouter.getRouter());

// app.use("/api/users/:id", userRouter.getRouter())

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

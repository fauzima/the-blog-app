import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserPayload } from "../custom";

export class UserMiddleware {
  checkId(req: Request, res: Response, next: NextFunction) {
    
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) throw "Unauthorized access!";

      const verifiedUser = verify(token, process.env.JWT_KEY!);

      req.user = verifiedUser as UserPayload;
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
    next();
  }

  verifyAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.role == "Admin") next();
    else res.status(401).send("Unauthorized access!");
  }
}

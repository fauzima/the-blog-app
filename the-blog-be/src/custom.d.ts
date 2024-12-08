import 'express'
import { UsersRole } from "@prisma/client";

type UserPayload = {
  id: number;
  role: UsersRole;
};

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}


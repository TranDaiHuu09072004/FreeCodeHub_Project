// src/types/express/index.ts

import { Request } from "express-serve-static-core";
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      role?: string | string[];
    };
  }
}

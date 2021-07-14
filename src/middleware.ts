//import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { tokenSecret } from "./keys";

export const verify = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) return res.status(403).json({ error: "please provide a token" });
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  next();
};

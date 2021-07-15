import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { tokenSecret } from "./keys";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) return res.status(403).json({ error: "please provide a token" });
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    verify(token, tokenSecret, (err, decoded) => {
      if (err)
        return res.status(500).json({ error: "failed to authenticate token" });
      else {
        //req.body = decoded;
        next();
      }
    });
  }
};

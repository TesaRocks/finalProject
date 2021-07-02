import express, { Request, Response } from "express";
import { UserV2Service } from "../services/userV2.service";
import { IUser } from "../services/user.interface";
import { body, param, validationResult } from "express-validator";
import { errorHandling } from "./error-handling";

export const userRouter: express.Router = express.Router();

const userV2Service = new UserV2Service();

userRouter.get("", async (req: Request, res: Response) => {
  try {
    const usersList = await userV2Service.getAll();
    res.status(200).json(usersList);
  } catch (err) {
    res.status(401).json(err);
  }
});

userRouter.get(
  "/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = await parseInt(req.params.id, 10);
      const user = await userV2Service.getUserById(id);
      if (user != undefined) {
        return res.status(200).json(user);
      } else {
        return res.status(404).send(errorHandling(undefined));
      }
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
userRouter.post(
  "",
  body("name").exists().isLength({ max: 45 }),
  body("email").exists().isEmail(),
  body("password").isLength({ min: 6, max: 20 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newUser = await userV2Service.save(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

userRouter.put(
  "/:id",
  [
    param("id").exists().isNumeric(),
    body("name").exists().isLength({ max: 45 }),
    body("email").exists().isEmail(),
    body("password").isLength({ min: 6, max: 20 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = parseInt(req.params.id, 10);
      const newUser: IUser = req.body;
      const updatedUser = await userV2Service.updateUser(id, newUser);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

userRouter.delete(
  "/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = parseInt(req.params.id, 10);
      const removeUser = await userV2Service.removeUser(id);
      res.status(200).json(removeUser);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

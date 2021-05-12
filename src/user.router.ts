import express, { Request, Response } from "express";
import { IUser } from "./user.interface";
import { UserService } from "./users.service";

export const userRouter = express.Router();

const userService = new UserService();
const notFoundMessage = "User not found";

userRouter.get("", (req: Request, res: Response) => {
  res.status(200).json(userService.getAll());
});

userRouter.get("/:id", (req, res) => {
  const id: number = parseInt(req.params.id, 10);

  const item = userService.getUser(id);
  if (!item) {
    return res.status(404).send(notFoundMessage);
  }
  res.status(200).json(item);
});
userRouter.post("", (req: Request, res: Response) => {
  res.status(201).json(userService.save(req.body));
});

userRouter.put("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const newUser: IUser = req.body;

  const item = userService.getUser(id);
  if (!item) {
    return res.status(404).send(notFoundMessage);
  }

  res.status(200).json(userService.updateUser(id, newUser));
});

userRouter.delete("/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const item = userService.getUser(id);
  if (!item) {
    return res.status(404).send(notFoundMessage);
  }

  res.status(200).json(userService.removeUser(id));
});

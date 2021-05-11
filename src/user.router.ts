import express, { Request, Response } from "express";
import { IUser } from "./user.interface";
import { UserService } from "./users.service";

export const userRouter = express.Router();

const userService = new UserService();

userRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(userService.initial());
});

userRouter.get("/user", (req: Request, res: Response) => {
  res.status(200).json(userService.getAll());
});

userRouter.get("/user/:id", (req, res) => {
  const id: number = parseInt(req.params.id, 10);

  const item = userService.getUser(id);
  if (!item) {
    return res.status(404).send("item not found");
  }
  res.status(200).json(item);
});
userRouter.post("/user", (req: Request, res: Response) => {
  res.status(201).json(userService.save(req.body));
});

userRouter.put("/user/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const newUser: IUser = req.body;

  const item = userService.getUser(id);
  if (!item) {
    return res.status(404).send("item not found");
  }

  res.status(200).json(userService.updateUser(id, newUser));
});

userRouter.delete("/user/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const item = userService.getUser(id);
  if (!item) {
    return res.status(404).send("item not found");
  }

  res.status(200).json(userService.removeUser(id));
});

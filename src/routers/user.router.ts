import express, { Request, Response } from "express";
import { IUser } from "../services/user.interface";
import { UserService } from "../services/user.service";
import { UserV2Service } from "../services/userV2.service";

export const userRouter: express.Router = express.Router();

const userService = new UserService();
const userV2Service = new UserV2Service();
const notFoundMessage = "User not found";

userRouter.get("", async (req: Request, res: Response) => {
  //res.status(200).json(userService.getAll());

  const response = await userV2Service.getAll();
  console.log("response  await userV2Service.getAll", response);
  res.status(200).json(response);
});

userRouter.get("/:id", (req: Request, res: Response) => {
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
  userService.removeUser(id);
  res.status(200).send("Successfully Deleted");
});

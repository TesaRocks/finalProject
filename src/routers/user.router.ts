import express, { Request, Response } from "express";
import { UserV2Service } from "../services/userV2.service";

export const userRouter: express.Router = express.Router();

const userV2Service = new UserV2Service();
const notFoundMessage = "User not found";

userRouter.get("", async (req: Request, res: Response) => {
  const usersList = await userV2Service.getAll();
  res.status(200).json(usersList);
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = await parseInt(req.params.id, 10);
  const user = await userV2Service.getUserById(id);
  return res.status(200).json(user);
});
userRouter.post("", async (req: Request, res: Response) => {  
  try {
    const newUser = await userV2Service.save(req.body);
    res.status(201).json(newUser);
  } catch (err) { 
    res.status(401).json(err);
  }
});




// userRouter.put("/:id", (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id, 10);
//   const newUser: IUser = req.body;

//   const item = userService.getUser(id);
//   if (!item) {
//     return res.status(404).send(notFoundMessage);
//   }

//   res.status(200).json(userService.updateUser(id, newUser));
// });

// userRouter.delete("/:id", (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id, 10);
//   const item = userService.getUser(id);
//   if (!item) {
//     return res.status(404).send(notFoundMessage);
//   }
//   userService.removeUser(id);
//   res.status(200).send("Successfully Deleted");
// });

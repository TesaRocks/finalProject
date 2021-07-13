import express, { Request, Response } from "express";
import { UserV2Service } from "../services/userV2.service";
import { IUser } from "../services/user.interface";
import { body, param, validationResult } from "express-validator";
import { errorHandling } from "./error-handling";
import { compare, hash } from "bcrypt";

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
  param("id").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = parseInt(req.params.id, 10);
      await userV2Service
        .getUserById(id)
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((err) => {
          return res.status(404).send(errorHandling("wrongId"));
        });
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

userRouter.post(
  "",
  body("name").exists().isLength({ max: 45 }),
  body("email").exists().isEmail(),
  body("password").exists().isLength({ min: 6, max: 20 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const saltRounds = 8;
      const { name, email, password } = req.body;
      const hashedPassword = await hash(password, saltRounds);
      const saveNewUser: IUser = {
        name: name,
        email: email,
        password: hashedPassword,
      };
      const newUser = await userV2Service.save(saveNewUser);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
userRouter.post(
  "/login",
  body("name").exists().isLength({ max: 45 }),
  body("email").exists().isEmail(),
  body("password").isLength({ min: 6, max: 20 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      await userV2Service.getUserByEmail(email).then((result) => {
        if (result !== undefined) {
          // Compare names
          if (result.name !== name)
            return res.status(404).send(errorHandling("noName"));
          // bcrypt compare passwords
          compare(password, result.password).then(function (result) {
            if (result) return res.status(200).json({ token: "capos" });
            else return res.status(404).send(errorHandling("noPassword"));
          });
        } else return res.status(404).send(errorHandling("noEmail"));
      });
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
      const saltRounds = 8;
      const { name, email, password } = req.body;
      const hashedPassword = await hash(password, saltRounds);
      const userToUpdate: IUser = {
        name: name,
        email: email,
        password: hashedPassword,
      };
      const id: number = parseInt(req.params.id, 10);
      const updatedUser = await userV2Service.updateUser(id, userToUpdate);
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

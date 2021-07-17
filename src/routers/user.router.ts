import express, { Request, Response } from "express";
import { UserV2Service } from "../services/userV2.service";
import { IUser } from "../services/user.interface";
import { body, param, validationResult } from "express-validator";
import { errorHandling } from "./error-handling";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { tokenSecret } from "../keys";
import { verifyToken } from "../middleware";

export const userRouter: express.Router = express.Router();

const userV2Service = new UserV2Service();

function generateToken() {
  return sign({ check: true }, tokenSecret, { expiresIn: "1d" });
}

userRouter.get("", verifyToken, async (req: Request, res: Response) => {
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
  verifyToken,
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
  body("email").exists().isEmail(),
  body("password").isLength({ min: 6, max: 20 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      await userV2Service.getUserByEmail(email).then((user) => {
        if (user !== undefined) {
          // bcrypt compare passwords
          compare(password, user.password).then(function (check) {
            if (check)
              return res.status(200).json({
                id: user.id,
                message: "Success",
                token: generateToken(),
                expiresIn: new Date(Date.now() + 3600 * 1000 * 24).getTime(),
              });
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

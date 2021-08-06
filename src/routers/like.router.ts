import express, { Request, Response } from "express";
import { errorHandling } from "./error-handling";
import { param, validationResult } from "express-validator";
import { LikeV2Service } from "../services/likeV2.service";

export const likeRouter: express.Router = express.Router();
const likeV2Service = new LikeV2Service();

likeRouter.get(
  "/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = await parseInt(req.params.id, 10);
      const likesByUserId = await likeV2Service.getLikesByUserId(id);
      if (likesByUserId != undefined) {
        return res.status(200).json(likesByUserId);
      } else {
        return res.status(404).send(errorHandling("wrongId"));
      }
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

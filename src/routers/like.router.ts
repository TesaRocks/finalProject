import express, { Request, Response } from "express";
import { errorHandling } from "./error-handling";
import { body, param, validationResult } from "express-validator";
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
likeRouter.post(
  "",
  body("productId").exists().isNumeric(),
  body("userId").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { productId, userId } = req.body;
      const newLikeResponseStatus = await likeV2Service.newLike(
        productId,
        userId
      );
      res.status(200).json(newLikeResponseStatus);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
likeRouter.delete(
  "/:userId/:productId",
  param("productId").exists().isNumeric(),
  param("userId").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const productId: number = parseInt(req.params.productId, 10);
      const userId: number = parseInt(req.params.userId, 10);
      const deleteLike = await likeV2Service.deleteLike(productId, userId);
      res.status(200).json(deleteLike);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

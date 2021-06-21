import express, { Request, Response } from "express";
import { UserV2Service } from "../services/userV2.service";
import { IUser } from "../services/user.interface";
import { errorHandling } from "./error-handling";
import { IProduct } from "../services/product.interface";

export const productRouter: express.Router = express.Router();
const userV2Service = new UserV2Service();

productRouter.get("", async (req: Request, res: Response) => {
  try {
    const productList = await userV2Service.getAllProducts();
    res.status(200).json(productList);
  } catch (err) {
    res.status(401).json(err);
  }
});
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = await parseInt(req.params.id, 10);
    const product = await userV2Service.getProductById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).send(errorHandling(undefined));
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

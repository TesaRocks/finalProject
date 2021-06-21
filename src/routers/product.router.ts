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

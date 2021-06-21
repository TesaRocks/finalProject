import express, { Request, Response } from "express";
import { UserV2Service } from "../services/userV2.service";
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

productRouter.post("", async (req: Request, res: Response) => {
  const userId: number = 1;
  try {
    const newProduct = await userV2Service.saveProduct(req.body, userId);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(401).json(err);
  }
});
productRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    console.log(id);
    console.log(req.body);
    const newProduct: IProduct = req.body;
    const updatedProduct = await userV2Service.updateProduct(id, newProduct);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(401).json(err);
  }
});

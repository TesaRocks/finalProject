import express, { Request, Response } from "express";
import { ProductV2Service } from "../services/productV2.service";
import { IProduct } from "../services/product.interface";
import { errorHandling } from "./error-handling";

export const productRouter: express.Router = express.Router();
const productV2Service = new ProductV2Service();

productRouter.get("", async (req: Request, res: Response) => {
  try {
    const productList = await productV2Service.getAllProducts();
    res.status(200).json(productList);
  } catch (err) {
    res.status(401).json(err);
  }
});
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = await parseInt(req.params.id, 10);
    const product = await productV2Service.getProductById(id);
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
  const userId: number = 5;
  try {
    const newProduct = await productV2Service.saveProduct(req.body, userId);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(401).json(err);
  }
});
productRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const newProduct: IProduct = req.body;
    const updatedProduct = await productV2Service.updateProduct(id, newProduct);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(401).json(err);
  }
});
productRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const removeProduct = await productV2Service.removeProduct(id);
    res.status(200).json(removeProduct);
  } catch (err) {
    res.status(401).json(err);
  }
});

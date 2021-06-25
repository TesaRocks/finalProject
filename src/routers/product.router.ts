import express, { Request, Response } from "express";
import { ProductV2Service } from "../services/productV2.service";
import { IProduct } from "../services/product.interface";
import { errorHandling } from "./error-handling";
import { IPagination } from "./pagination.interface";

export const productRouter: express.Router = express.Router();
const productV2Service = new ProductV2Service();

productRouter.get("", async (req: Request, res: Response) => {
  try {
    const productList = await productV2Service.getAllProducts();
    // Pagination
    const pagination: IPagination = {};
    const page: any = req.query.page;

    const limit: any = req.query.limit;
    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    if (endIndex < productList.length) {
      pagination.next = {
        page: parseInt(page) + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.previous = {
        page: parseInt(page) - 1,
        limit: limit,
      };
    }
    pagination.products = productList.slice(startIndex, endIndex);

    res.status(200).json(pagination);
  } catch (err) {
    res.status(401).json(err);
  }
});
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
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
  try {
    const newProduct = await productV2Service.saveProduct(req.body);
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

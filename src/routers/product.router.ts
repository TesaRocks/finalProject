import express, { Request, Response } from "express";
import { ProductV2Service } from "../services/productV2.service";
import { IProduct } from "../services/product.interface";
import { errorHandling } from "./error-handling";
import { body, query, param, validationResult } from "express-validator";

export const productRouter: express.Router = express.Router();
const productV2Service = new ProductV2Service();

productRouter.get(
  "",
  query("page").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const page: any = req.query.page;
      const productListPaginated =
        await productV2Service.getAllProductsPaginated(page);
      res.status(200).json(productListPaginated);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
productRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const productList = await productV2Service.getProducts();
    res.status(200).json(productList);
  } catch (err) {
    res.status(401).json(err);
  }
});
productRouter.get(
  "/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
  }
);

productRouter.post(
  "",
  body("name").exists().isLength({ max: 45 }),
  body("description").exists(),
  body("imagePath").isURL().isLength({ max: 255 }),
  body("price").exists(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newProduct = await productV2Service.saveProduct(req.body);

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
productRouter.put(
  "/:id",
  [
    param("id").exists().isNumeric(),
    body("name").exists().isLength({ max: 45 }),
    body("description").exists(),
    body("imagePath").isURL().isLength({ max: 255 }),
    body("price").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id: number = parseInt(req.params.id, 10);
      const newProduct: IProduct = req.body;
      const updatedProduct = await productV2Service.updateProduct(
        id,
        newProduct
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
productRouter.delete(
  "/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = parseInt(req.params.id, 10);
      const removeProduct = await productV2Service.removeProduct(id);
      res.status(200).json(removeProduct);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

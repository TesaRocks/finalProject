import express, { Request, Response } from "express";
import { InvoiceV2Service } from "../services/invoiceV2.service";
import { errorHandling } from "./error-handling";
import { body, param, query, validationResult } from "express-validator";

export const invoiceRouter: express.Router = express.Router();
const invoiceV2Service = new InvoiceV2Service();

invoiceRouter.get("/count", async (req: Request, res: Response) => {
  try {
    const totalInvoices = await invoiceV2Service.countInvoices();
    res.status(200).json(totalInvoices);
  } catch (err) {
    res.status(401).json(err);
  }
});
invoiceRouter.get(
  "",
  query("page").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const page: any = req.query.page;
      const invoiceListPaginated =
        await invoiceV2Service.getAllInvoicesPaginated(page);
      res.status(200).json(invoiceListPaginated);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
invoiceRouter.get(
  "/detail/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = await parseInt(req.params.id, 10);
      const invoiceDetailList = await invoiceV2Service.getInvoiceById(id);
      if (invoiceDetailList != undefined) {
        return res.status(200).json(invoiceDetailList);
      } else {
        return res.status(404).send(errorHandling("wrongId"));
      }
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
invoiceRouter.post(
  "",
  body("customerName").exists().isLength({ max: 45 }),
  body("invoiceItems").exists().isLength({ min: 1 }),
  body("invoiceItems.*.productId").exists().isInt({ min: 1 }),
  body("invoiceItems.*.quantity").exists().isInt({ min: 1 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newInvoice = await invoiceV2Service.saveInvoice(req.body);
      res.status(201).json(newInvoice);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

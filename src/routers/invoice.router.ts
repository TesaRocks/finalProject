import express, { Request, Response } from "express";
import { InvoiceV2Service } from "../services/invoiceV2.service";
import { errorHandling } from "./error-handling";
import { param, query, validationResult } from "express-validator";

export const invoiceRouter: express.Router = express.Router();
const invoiceV2Service = new InvoiceV2Service();

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
  "/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = await parseInt(req.params.id, 10);
      const invoiceDetailList = await invoiceV2Service.getInvoiceDetail(id);
      if (invoiceDetailList != undefined) {
        return res.status(200).json(invoiceDetailList);
      } else {
        return res.status(404).send(errorHandling(undefined));
      }
    } catch (err) {
      res.status(401).json(err);
    }
  }
);

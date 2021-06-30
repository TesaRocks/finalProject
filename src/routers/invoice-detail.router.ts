import express, { Request, Response } from "express";
import { errorHandling } from "./error-handling";
import { param, validationResult } from "express-validator";
import { InvoiceDetailV2Service } from "../services/invoiceDetailV2.service";

export const invoiceDetailRouter: express.Router = express.Router();
const invoiceDetailV2Service = new InvoiceDetailV2Service();

invoiceDetailRouter.get(
  "/:id",
  param("id").exists().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id: number = await parseInt(req.params.id, 10);
      const invoiceDetailList = await invoiceDetailV2Service.getInvoiceDetail(
        id
      );
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

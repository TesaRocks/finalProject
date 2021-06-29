import express, { Request, Response } from "express";
import { InvoiceV2Service } from "../services/invoiceV2.service";
import { errorHandling } from "./error-handling";

export const invoiceRouter: express.Router = express.Router();
const invoiceV2Service = new InvoiceV2Service();

invoiceRouter.get("", async (req: Request, res: Response) => {
  try {
    const { page }: any = req.query.page;
    const invoiceListPaginated = await invoiceV2Service.getAllInvoicesPaginated(
      page
    );
    res.status(200).json(invoiceListPaginated);
  } catch (err) {
    res.status(401).json(err);
  }
});

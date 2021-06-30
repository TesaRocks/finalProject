import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { Db } from "./Db";
import {
  IInvoice,
  IInvoiceDetail,
} from "../services/invoice-invoiceDetail.interface";
export class InvoiceRepository {
  private db: Db;

  constructor() {
    this.db = container.resolve<Db>(Db);
  }

  public async getInvoicesPaginated(
    pageNumber: number = 1,
    itemsPerPage: number = 4
  ): Promise<IInvoice[]> {
    const offsetValue: number = (pageNumber - 1) * itemsPerPage;
    const paginatedInvoiceList = await this.db.query({
      sql: "SELECT * from invoice LIMIT ? OFFSET ?",
      values: [itemsPerPage, offsetValue],
    });
    return paginatedInvoiceList;
  }
  public async getInvoiceDetail(invoiceId: number): Promise<IInvoiceDetail[]> {
    const invoiceDetailList = await this.db.query({
      sql: "SELECT invoiceDetail.invoiceDetailId, products.name, products.description,invoiceDetail.quantity, products.price FROM invoiceDetail INNER JOIN products on invoiceDetail.productId = products.productId INNER JOIN invoice on invoiceDetail.invoiceId = invoice.invoiceId WHERE invoice.invoiceId = ?",
      values: invoiceId,
    });
    return invoiceDetailList;
  }
}

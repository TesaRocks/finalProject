import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { Db } from "./Db";
import { IInvoice } from "../services/invoice.interface";
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
      sql: "SELECT invoiceDetail.invoiceDetailId, invoice.date, invoice.customerName, products.name, products.description, invoiceDetail.quantity, products.price from invoiceDetail inner join invoice on invoiceDetail.invoiceId = invoice.invoiceId inner join products on invoiceDetail.productId = products.productId LIMIT ? OFFSET ?",
      values: [itemsPerPage, offsetValue],
    });
    return paginatedInvoiceList;
  }
}

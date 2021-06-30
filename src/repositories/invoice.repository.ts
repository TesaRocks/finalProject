import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { Db } from "./Db";
import { IInvoice } from "../services/invoice-invoiceDetail.interface";
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
  public async save(invoice: IInvoice): Promise<IInvoice> {
    const okPacket: OkPacket = await this.db.query({
      sql: "INSERT INTO invoice  SET?;",
      values: [invoice],
    });
    invoice.invoiceId = okPacket.insertId;
    return invoice;
  }
}

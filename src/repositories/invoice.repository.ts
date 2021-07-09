import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { Db } from "./Db";
import { IInvoice, IItem } from "../services/invoice.interface";

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

  public async getInvoiceById(invoiceId: number): Promise<IInvoice> {
    const invoiceById = await this.db.query({
      sql: "SELECT invoice.invoiceId,invoice.date,invoice.customerName, invoiceDetail.invoiceDetailId, products.productId, products.name, products.description,invoiceDetail.quantity, products.price FROM invoiceDetail INNER JOIN products on invoiceDetail.productId = products.productId INNER JOIN invoice on invoiceDetail.invoiceId = invoice.invoiceId WHERE invoice.invoiceId = ?",
      values: invoiceId,
    });
    // Making an invoice Object according to its interface
    const detailResult: IItem[] = [];
    for (let i = 0; i < invoiceById.length; i++) {
      detailResult[i] = {
        invoiceDetailId: invoiceById[i]["invoiceDetailId"],
        productId: invoiceById[i]["productId"],
        name: invoiceById[i]["name"],
        description: invoiceById[i]["description"],
        quantity: invoiceById[i]["quantity"],
        price: invoiceById[i]["price"],
      };
    }
    const invoiceByIdFinal: IInvoice = {
      invoiceId: invoiceById[0]["invoiceId"],
      date: invoiceById[0]["date"],
      customerName: invoiceById[0]["customerName"],
      invoiceItems: detailResult,
    };

    return invoiceByIdFinal;
  }
  public async saveInvoice(invoice: IInvoice): Promise<IInvoice> {
    const okPacketInvoice: OkPacket = await this.db.query({
      sql: "INSERT INTO invoice SET customerName=?;",
      values: [invoice.customerName],
    });
    invoice.invoiceId = okPacketInvoice.insertId;

    // Iterate over the list of products given
    for (let product of invoice.invoiceItems) {
      const okPacketInvoiceDetail: OkPacket = await this.db.query({
        sql: "INSERT INTO invoiceDetail SET invoiceId = ?, productId = ?, quantity = ?",
        values: [invoice.invoiceId, product.productId, product.quantity],
      });
      product.invoiceDetailId = okPacketInvoiceDetail.insertId;
    }
    return invoice;
  }
}

import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { Db } from "./Db";
import { IInvoiceDetail } from "../services/invoice-invoiceDetail.interface";
export class InvoiceDetailRepository {
  private db: Db;

  constructor() {
    this.db = container.resolve<Db>(Db);
  }

  public async getInvoiceDetail(invoiceId: number): Promise<IInvoiceDetail[]> {
    const invoiceDetailList = await this.db.query({
      sql: "SELECT invoiceDetail.invoiceDetailId, products.name, products.description,invoiceDetail.quantity, products.price FROM invoiceDetail INNER JOIN products on invoiceDetail.productId = products.productId INNER JOIN invoice on invoiceDetail.invoiceId = invoice.invoiceId WHERE invoice.invoiceId = ?",
      values: invoiceId,
    });
    return invoiceDetailList;
  }
  // public async save(invoiceId:number, productId:number, quantity:number): Promise<IInvoiceDetail> {

  //   const okPacket: OkPacket = await this.db.query({
  //     sql: "INSERT INTO invoiceDetail  SET?;",
  //     values: [invoiceId, productId, quantity],
  //   });
  //   invoiceDetail.invoiceDetailId = okPacket.insertId;
  //   return invoiceDetail;
  // }
}

import { InvoiceRepository } from "../repositories/invoice.repository";
import { IInvoice } from "./invoice.interface";

export class InvoiceV2Service {
  private invoiceRepository: InvoiceRepository;
  constructor() {
    this.invoiceRepository = new InvoiceRepository();
  }
  public async getAllInvoicesPaginated(pageNumber: number) {
    return await this.invoiceRepository.getInvoicesPaginated(pageNumber);
  }
  public async getInvoiceById(invoiceId: number) {
    return await this.invoiceRepository.getInvoiceById(invoiceId);
  }
  public async countInvoices() {
    return await this.invoiceRepository.countInvoices();
  }
  public async saveInvoice(invoice: IInvoice) {
    return await this.invoiceRepository.saveInvoice(invoice);
  }
}

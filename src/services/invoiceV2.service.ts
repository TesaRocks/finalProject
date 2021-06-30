import { InvoiceRepository } from "../repositories/invoice.repository";

export class InvoiceV2Service {
  private invoiceRepository: InvoiceRepository;
  constructor() {
    this.invoiceRepository = new InvoiceRepository();
  }
  public async getAllInvoicesPaginated(pageNumber: number) {
    return await this.invoiceRepository.getInvoicesPaginated(pageNumber);
  }
  public async getInvoiceDetail(invoiceId: number) {
    return await this.invoiceRepository.getInvoiceDetail(invoiceId);
  }
}

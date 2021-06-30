import { InvoiceDetailRepository } from "../repositories/invoice-detail.repository";

export class InvoiceDetailV2Service {
  private invoiceDetailRepository: InvoiceDetailRepository;
  constructor() {
    this.invoiceDetailRepository = new InvoiceDetailRepository();
  }

  public async getInvoiceDetail(invoiceId: number) {
    return await this.invoiceDetailRepository.getInvoiceDetail(invoiceId);
  }
}

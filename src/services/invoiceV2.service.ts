import { InvoiceRepository } from "../repositories/invoice.repository";

export class InvoiceV2Service {
  private invoiceRepository: InvoiceRepository;
  constructor() {
    this.invoiceRepository = new InvoiceRepository();
  }
  public async getAllInvoicesPaginated(pageNumber: number) {
    return await this.invoiceRepository.getInvoicesPaginated(pageNumber);
  }
}

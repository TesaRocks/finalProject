export interface IInvoice {
  invoiceId: number;
  date: Date;
  customerName: string;
}

export interface IInvoiceDetail {
  invoiceDetailId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

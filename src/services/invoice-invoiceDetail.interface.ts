export interface IInvoice {
  invoiceId: number;
  date: Date;
  customerName: string;
  invoiceDetailId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

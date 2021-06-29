export interface IInvoice {
  invoiceDetailId: number;
  date: Date;
  customerName: string;
  productName: string;
  description: string;
  quantity: number;
  price: number;
}

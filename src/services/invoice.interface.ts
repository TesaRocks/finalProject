export interface IInvoice {
  invoiceId: number;
  date: Date;
  customerName: string;
  invoiceItems: IItem[];
}

export interface IItem {
  invoiceDetailId: number;
  productId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

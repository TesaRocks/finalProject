/** **************************************
    mysql table invoiceDetail:
    has one to many relationship with invoice
    and one to one relationship
    with table mysql table products
 ***************************************/

export interface IInvoice {
  invoiceId: number;
  date: Date;
  customerName: string;
  invoiceItems: IItem[];
}

export interface IItem {
  invoiceDetailId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

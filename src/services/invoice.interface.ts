export interface IInvoice {
  // mysql table invoice

  invoiceId: number;
  date: Date;
  customerName: string;

  /** **************************************
    mysql table invoiceDetail:
    has one to many relationship with invoice
    and one to one relationship
    with table mysql table products
 ***************************************/

  invoiceDetailId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface IProduct {
  product_id?: number;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  createdAt?: Date;
  isSold?: boolean;
  id?: number;
}

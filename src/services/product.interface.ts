export interface IProduct {
  productId?: number;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  created?: Date;
  sold?: boolean;
  id?: number;
}

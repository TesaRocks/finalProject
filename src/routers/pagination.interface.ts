import { IProduct } from "../services/product.interface";

export interface IPagination {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  products?: IProduct[];
}

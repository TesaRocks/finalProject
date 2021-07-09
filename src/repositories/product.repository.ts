import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { IProduct } from "../services/product.interface";
import { Db } from "./Db";

export class ProductRepository {
  private db: Db;

  constructor() {
    this.db = container.resolve<Db>(Db);
  }

  public async getProductsPaginated(
    pageNumber: number = 1,
    itemsPerPage: number = 6
  ): Promise<IProduct[]> {
    const offsetValue: number = (pageNumber - 1) * itemsPerPage;

    const paginatedProductList = await this.db.query({
      sql: "SELECT * FROM products LIMIT ? OFFSET ?",
      values: [itemsPerPage, offsetValue],
    });

    return paginatedProductList;
  }
  public async getProducts(): Promise<IProduct[]> {
    const productList = await this.db.query({
      sql: "SELECT * FROM products ",
    });

    return productList;
  }
  public async getProductById(index: number): Promise<IProduct> {
    const productFound = await this.db.query({
      sql: `SELECT * FROM products WHERE productId= ?`,
      values: [index],
    });
    return productFound[0];
  }

  public async saveProduct(product: IProduct): Promise<IProduct> {
    const okPacket: OkPacket = await this.db.query({
      sql: `INSERT INTO products SET ?;`,
      values: [product],
    });
    product.productId = okPacket.insertId;
    return product;
  }
  public async updateProduct(
    productId: number,
    product: IProduct
  ): Promise<IProduct | string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `UPDATE products SET name= ?, description= ?, imagePath= ?, price= ?  WHERE productId= ?`,
      values: [
        product.name,
        product.description,
        product.imagePath,
        product.price,
        productId,
      ],
    });
    return okPacket.affectedRows !== 0 ? product : "Invalid product Id";
  }
  public async removeProduct(productId: number): Promise<string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `DELETE FROM products WHERE productId= ?`,
      values: [productId],
    });
    return okPacket.affectedRows !== 0
      ? "Successfuly Deleted"
      : "Invalid product Id!";
  }
}

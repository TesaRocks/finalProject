import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { IProduct } from "../services/product.interface";
import { Db } from "./Db";

export class ProductRepository {
  private db: Db;

  constructor() {
    this.db = container.resolve<Db>(Db);
  }

  public async getProducts(): Promise<IProduct[]> {
    const productList = await this.db.query({
      sql: "SELECT * FROM products",
    });
    return productList;
  }
  public async getProductById(index: number): Promise<IProduct> {
    const productFound = await this.db.query({
      sql: `SELECT productId,name, description, imagePath, price, created, sold, id FROM products WHERE productId= ?`,
      values: [index],
    });
    return productFound[0];
  }
  public async saveProduct(product: IProduct, id: number): Promise<IProduct> {
    const okPacket: OkPacket = await this.db.query({
      sql: `INSERT INTO products SET ?;`,
      values: [product],
    });
    product.productId = okPacket.insertId;
    return product;
  }
  public async updateProduct(
    id: number,
    product: IProduct
  ): Promise<IProduct | string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `UPDATE products SET name= ?, description= ?, imagePath= ?, price= ?  WHERE productId= ?`,
      values: [
        product.name,
        product.description,
        product.imagePath,
        product.price,
        id,
      ],
    });
    return okPacket.affectedRows !== 0 ? product : "Invalid product Id";
  }
  public async removeProduct(id: number): Promise<string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `DELETE FROM products WHERE productId= ?`,
      values: [id],
    });
    return okPacket.affectedRows !== 0
      ? "Successfuly Deleted"
      : "Invalid product Id!";
  }
}

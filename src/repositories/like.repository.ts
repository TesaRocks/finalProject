import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { IProduct } from "../services/product.interface";
import { Db } from "./Db";

export class LikeRepository {
  private db: Db;
  constructor() {
    this.db = container.resolve<Db>(Db);
  }
  public async getLikesByUserId(userId: number): Promise<IProduct[]> {
    const likesByUserId = await this.db.query({
      sql: "select  products.productId, products.name, products.description, products.price,products.imagePath from productLike inner join products on productLike.productId = products.productId inner join user on productLike.id = user.id where user.id=?",
      values: userId,
    });

    return likesByUserId;
  }
  public async getLikebyProductId(productId: number): Promise<IProduct> {
    const likeByProductId = await this.db.query({
      sql: "select  products.productId, products.name, products.description, products.price,products.imagePath from productLike inner join products on productLike.productId = products.productId inner join user on productLike.id = user.id where products.productId=?",
      values: productId,
    });
    return likeByProductId;
  }
  public async newLike(productId: number, id: number): Promise<string> {
    await this.db.query({
      sql: "INSERT INTO productLike SET productId=?, id=?",
      values: [productId, id],
    });
    return "Succesfully added";
  }
  public async deleteLike(productId: number, id: number): Promise<string> {
    await this.db.query({
      sql: "DELETE FROM productLike WHERE productId=? and id=?",
      values: [productId, id],
    });

    return "Succesfully deleted";
  }
}

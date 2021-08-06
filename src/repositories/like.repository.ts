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
    console.log(likesByUserId);

    return likesByUserId;
  }
}

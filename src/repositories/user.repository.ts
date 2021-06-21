import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { IUser } from "../services/user.interface";
import { IProduct } from "../services/product.interface";
import { Db } from "./Db";

export class UserRepository {
  private db: Db;

  constructor() {
    this.db = container.resolve<Db>(Db);
  }

  public async getUsers(): Promise<IUser[]> {
    const usersList = await this.db.query({
      sql: "SELECT id,name, email, password FROM user",
    });
    return usersList;
  }
  public async getUserById(index: number): Promise<IUser> {
    const userFound = await this.db.query({
      sql: `SELECT id,name, email, password FROM user WHERE id = ${index}`,
    });
    return userFound[0];
  }
  public async save(user: IUser): Promise<IUser> {
    const okPacket: OkPacket = await this.db.query({
      sql: `INSERT INTO user (name, email, password) VALUES('${user.name}', '${user.email}', '${user.password}');`,
    });
    user.id = okPacket.insertId;
    return user;
  }
  public async updateUser(id: number, user: IUser): Promise<IUser | string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `UPDATE user SET name='${user.name}', email='${user.email}', password='${user.password}' WHERE id= '${id}'`,
    });
    return okPacket.affectedRows !== 0 ? user : "Invalid user Id";
  }
  public async removeUser(id: number): Promise<string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `DELETE FROM user WHERE id='${id}'`,
    });
    return okPacket.affectedRows !== 0
      ? "Successfuly Deleted"
      : "Invalid user Id";
  }
  public async getProducts(): Promise<IProduct[]> {
    const productList = await this.db.query({
      sql: "SELECT * FROM products",
    });
    return productList;
  }
  public async getProductById(index: number): Promise<IProduct> {
    const productFound = await this.db.query({
      sql: `SELECT * FROM products WHERE productId= ${index}`,
    });
    return productFound[0];
  }
}

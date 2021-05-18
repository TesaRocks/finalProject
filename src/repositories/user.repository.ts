import { OkPacket } from "mysql";
import { container } from "tsyringe";
import { IUser } from "../services/user.interface";
import { Db } from "./Db";

export class UserRepository {
  private db: Db;

  constructor() {
    this.db = container.resolve<Db>(Db);
  }

  public async getUsers(): Promise<IUser[]> {
    try {
      const usersList = await this.db.query({ sql: "SELECT * FROM user" });
      console.log("info", usersList);
      return usersList;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  public async getUserById(index: number): Promise<IUser> {
    try {
      const userFound = await this.db.query({
        sql: `SELECT * FROM user WHERE id = ${index}`,
      });
      return userFound[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  public async save(user: IUser) {
    try {
      const okPacket: OkPacket = await this.db.query({
        sql: `INSERT INTO user (name, email, password) VALUES('${user.name}', ${user.email}, '${user.password}');`,
      });
      user.id = okPacket.insertId;      
      return user;
    } catch (err) {
      throw err;      
    }
  }
}

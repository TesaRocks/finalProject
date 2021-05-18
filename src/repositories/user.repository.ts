import { container } from "tsyringe";
import { IUser } from "../services/user.interface";
import { Db } from "./Db";

export class UserRepository {
  private db: Db;

  constructor() {
    this.db = container.resolve<Db>(Db);
  }

  public async getUsers() {
    try {
      const info = await this.db.query({ sql: "SELECT * FROM user" });
      console.log("info", info);
      return info;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  public async getUser(index: number) {
    try {
      const info = await this.db.query({
        sql: `SELECT * FROM user WHERE id = ${index}`,
      });
      return info;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  public async save(user: IUser) {
    try {
      const newUser = await this.db.query({
        sql: `INSERT INTO user (name, email, password) VALUES(${user.name}, ${user.email}, ${user.password});`,
      });
      console.log("1 record inserted");
      return newUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

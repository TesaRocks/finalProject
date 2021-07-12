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
    const usersList = await this.db.query({
      sql: "SELECT id,name, email, password FROM user",
    });
    return usersList;
  }
  public async getUserById(index: number): Promise<IUser> {
    const userFound = await this.db.query({
      sql: "SELECT id,name, email, password FROM user WHERE id = ?",
      values: [index],
    });
    const userById: IUser = {
      id: userFound[0].id,
      name: userFound[0].name,
      email: userFound[0].email,
    };
    return userById;
  }
  public async save(user: IUser): Promise<IUser> {
    const okPacket: OkPacket = await this.db.query({
      sql: "INSERT INTO user  SET?;",
      values: [user],
    });
    user.id = okPacket.insertId;
    return user;
  }
  public async updateUser(id: number, user: IUser): Promise<IUser | string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `UPDATE user SET name= ?, email= ?, password= ? WHERE id= ?`,
      values: [user.name, user.email, user.password, id],
    });
    return okPacket.affectedRows !== 0 ? user : "Invalid user Id";
  }
  public async removeUser(id: number): Promise<string> {
    const okPacket: OkPacket = await this.db.query({
      sql: `DELETE FROM user WHERE id= ?`,
      values: [id],
    });
    return okPacket.affectedRows !== 0
      ? "Successfuly Deleted"
      : "Invalid user Id";
  }
  public async login(user: IUser): Promise<IUser | string> {
    const okPacketEmail: OkPacket = await this.db.query({
      sql: "SELECT email from user WHERE email = ?",
      values: user.email,
    });
    const okPacketPassword: OkPacket = await this.db.query({
      sql: "SELECT password from user WHERE password = ?",
      values: user.password,
    });
    return user;
  }
}

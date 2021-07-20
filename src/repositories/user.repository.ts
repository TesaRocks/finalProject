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
      sql: "SELECT * FROM user",
    });
    return usersList;
  }
  public async getUserById(index: number): Promise<IUser> {
    const userFound = await this.db.query({
      sql: "SELECT id,name, email, role FROM user WHERE id = ?",
      values: [index],
    });
    const userById: IUser = {
      id: userFound[0].id,
      name: userFound[0].name,
      email: userFound[0].email,
      password: "",
      role: userFound[0].role,
    };
    return userById;
  }
  public async getUserbyEmail(email: string): Promise<IUser> {
    const userToLog = await this.db.query({
      sql: `SELECT  * FROM user WHERE  email = ? `,
      values: [email],
    });
    return userToLog[0];
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
      sql: `UPDATE user SET name= ?, email= ?, password= ?, role= ? WHERE id= ?`,
      values: [user.name, user.email, user.password, user.role, id],
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
}

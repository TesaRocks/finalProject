import * as mysql from "mysql";

export class UserRepository {
  private connection: mysql.Connection;
  constructor() {
    this.connection = mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "user",
      password: "password",
      database: "db",
    });
    this.connection.connect((err: mysql.MysqlError) => {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  public getUsers() {
    //this.connection.;
  }
}

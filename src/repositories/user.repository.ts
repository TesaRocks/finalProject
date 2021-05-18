import { IDb } from "./makeDb";

export class UserRepository {
  private db: IDb;

  constructor(db: IDb) {
    this.db = db;
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
}

// private connection: mysql.Connection;
// this.connection = mysql.createConnection({
//   host: "127.0.0.1",
//   port: 3307,
//   user: "user",
//   password: "password",
//   database: "db",
// });
// this.connection.connect((err: mysql.MysqlError) => {
//   if (err) throw err;
//   console.log("Connected!");
// });

//   this.connection.query(
//     "SELECT * FROM user",
//     function (err: mysql.MysqlError, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       return result;
//     }
//   );
// }

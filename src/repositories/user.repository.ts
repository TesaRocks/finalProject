import * as mysql from "mysql";
import { IDb } from "./makeDb";
//import util from 'util'


export class UserRepository {
  // private connection: mysql.Connection;
  // private util

  private db: IDb;


  constructor(db: IDb) {    
    this.db = db;

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
  }

  public async getUsers() {
    try {
      const info =  await this.db.query({ sql: "SELECT * FROM user" });
      console.log("info", info);
      return info;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

//   this.connection.query(
//     "SELECT * FROM user",
//     function (err: mysql.MysqlError, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       return result;
//     }
//   );
// }

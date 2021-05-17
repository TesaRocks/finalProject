import * as mysql from "mysql";
import { container } from "tsyringe";
import { Db } from "./Db";

export class UserRepository {
  private db: Db ;

  constructor() {    
    this.db = container.resolve<Db>(Db);;
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

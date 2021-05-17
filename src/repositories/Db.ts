import util from "util";
import mysql, { ConnectionConfig, QueryOptions } from "mysql";
import { injectable } from "tsyringe";

@injectable()
class Db implements IDb {
  private connection;
  constructor() {
    const config: ConnectionConfig = {
      host: "127.0.0.1",
      port: 3307,
      user: "user",
      password: "password",
      database: "db",
    };
    this.connection = mysql.createConnection(config);
  }

  query(sql: QueryOptions) {
    return util.promisify(this.connection.query).call(this.connection, sql);
  }
  close() {
    return util.promisify(this.connection.end).call(this.connection);
  }
}

interface IDb {
  query: (sql: QueryOptions) => Promise<unknown>;
  close: () => Promise<void>;
}

export { Db, IDb };

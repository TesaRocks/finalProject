import util from "util";
import mysql, { ConnectionConfig, QueryOptions } from "mysql";


function makeDb(config: ConnectionConfig): IDb {
  const connection = mysql.createConnection(config);
  return {
    query(sql: QueryOptions) {
      return util.promisify(connection.query).call(connection, sql);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

interface IDb {
  query: (sql: QueryOptions) => Promise<unknown>;
  close: () => Promise<void>
}

export { makeDb, IDb };

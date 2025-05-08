import sqlite3 from "sqlite3";

export default class Database {
  constructor(db, tableName) {
    this.db = new sqlite3.Database(db);
    this.tableName = tableName;
  }

  createTable = () => {
    return new Promise((resolve, reject) => {
      this.db.exec(
        `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)`,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  };

  add = (content) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO ${this.tableName}(content) VALUES (?)`,
        content,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  };

  fetch = () => {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM ${this.tableName}`, (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  };

  remove = (content) => {
    return new Promise((resolve, reject) => {
      this.db.run(
        `DELETE FROM ${this.tableName} WHERE content = ?`,
        [content],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  };
}

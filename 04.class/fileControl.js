import sqlite3 from "sqlite3";

export default class FileControl {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");
    this.dbName = "memos";
  }

  createTable = () => {
    return new Promise((resolve, reject) => {
      this.db.exec(
        `CREATE TABLE IF NOT EXISTS ${this.dbName} (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)`,
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
        `INSERT INTO ${this.dbName}(content) VALUES (?)`,
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
      this.db.all(`SELECT * FROM ${this.dbName}`, (error, rows) => {
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
        `DELETE FROM ${this.dbName} WHERE content = ?`,
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

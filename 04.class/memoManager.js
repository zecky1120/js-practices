import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./memo.db");
const dbName = "memos";
const createTableSql = `CREATE TABLE IF NOT EXISTS ${dbName} (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)`;
const insertSql = `INSERT INTO ${dbName}(content) VALUES (?)`;
const selectSql = `SELECT * FROM ${dbName}`;
const deleteSql = `DELETE FROM ${dbName} WHERE content = ?`;

export default class DbOperation {
  constructor() {
    this.createTable = () => {
      return new Promise((resolve, reject) => {
        db.exec(createTableSql, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    };
  }

  add = (content) => {
    return new Promise((resolve, reject) => {
      db.run(insertSql, content, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  fetch = () => {
    return new Promise((resolve, reject) => {
      db.all(selectSql, (error, rows) => {
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
      db.run(deleteSql, [content], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
}

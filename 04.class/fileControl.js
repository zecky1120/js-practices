import {
  db,
  createTableSql,
  insertSql,
  selectSql,
  deleteSql,
} from "./memoManagerVariable.js";

export default class FileControl {
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

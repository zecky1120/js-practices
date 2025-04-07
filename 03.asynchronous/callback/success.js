import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)";
const insertSql = "INSERT INTO books (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM books WHERE id = ?";
const dropTableSql = "DROP TABLE books";

db.run(createTableSql, () => {
  console.log("テーブルが作成されました");
  db.run(insertSql, bookTitle, () => {
    console.log("本が追加されました");
    db.all(selectSql, (_, rows) => {
      console.log(rows);
      db.run(dropTableSql, () => {
        console.log("テーブルを削除しました");
        db.close();
      });
    });
  });
});

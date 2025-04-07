import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)";
const insertSql = "INSERT INTO book (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM booka";
const dropTableSql = "DROP TABLE books";

db.run(createTableSql, () => {
  console.log("テーブルが作成されました");
  db.run(insertSql, bookTitle, (err) => {
    console.error(err.message);
    db.all(selectSql, (err) => {
      console.error(err.message);
      db.run(dropTableSql, () => {
        console.log("テーブルを削除しました");
        db.close();
      });
    });
  });
});

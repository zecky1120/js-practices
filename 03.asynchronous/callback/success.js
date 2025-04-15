import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)";
const insertSql = "INSERT INTO books (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM books WHERE id = ?";
const dropTableSql = "DROP TABLE books";

db.run(createTableSql, () => {
  db.run(insertSql, bookTitle, function () {
    console.log(`本(ID: ${this.lastID})が追加されました`);
    db.get(selectSql, [this.lastID], (_, rows) => {
      console.log(`ID: ${rows.id}, タイトル: ${rows.title}`);
      db.run(dropTableSql, () => {
        console.log("テーブルを削除しました");
        db.close();
      });
    });
  });
});

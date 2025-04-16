import sqlite3 from "sqlite3";
import { runSql, executeSql, close } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertSql = "INSERT INTO books (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM books WHERE id = ?";
const dropTableSql = "DROP TABLE books";

await runSql(db, createTableSql);
try {
  const result = await runSql(db, insertSql, bookTitle);
  console.log(`本(ID: ${result.lastID})が追加されました`);
  const row = await executeSql(db, selectSql, [result.lastID]);
  console.log(`ID: ${row.id}, タイトル: ${row.title}`);
  await runSql(db, dropTableSql);
  console.log("テーブルを削除しました");
} finally {
  await close(db);
}

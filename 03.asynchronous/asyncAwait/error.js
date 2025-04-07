import sqlite3 from "sqlite3";
import { runSql, executeSql, close } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)";
const insertSql = "INSERT INTO book (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM booka";
const dropTableSql = "DROP TABLE books";

await runSql(db, createTableSql);
console.log("テーブルが作成されました");

try {
  await runSql(db, insertSql, bookTitle);
  console.log("本が追加されました");
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await executeSql(db, selectSql);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}

await runSql(db, dropTableSql);
console.log("テーブルを削除しました");

await close(db);

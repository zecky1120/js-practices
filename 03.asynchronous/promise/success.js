import sqlite3 from "sqlite3";
import { runSql, executeSql, close } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL)";
const insertSql = "INSERT INTO books (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM books WHERE id = ?";
const dropTableSql = "DROP TABLE books";

runSql(db, createTableSql)
  .then(() => runSql(db, insertSql, bookTitle))
  .then((result) => {
    console.log(`本(ID: ${result.lastID})が追加されました`);
    return executeSql(db, selectSql, [result.lastID]);
  })
  .then((row) => {
    console.log(`ID: ${row.id}, タイトル: ${row.title}`);
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return runSql(db, dropTableSql);
  })
  .finally(() => close(db));

import sqlite3 from "sqlite3";
import { runSql, executeSql, close } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)";
const insertSql = "INSERT INTO books (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM books";
const dropTableSql = "DROP TABLE books";

runSql(db, createTableSql)
  .then(() => runSql(db, insertSql, bookTitle))
  .then(() => {
    console.log("本が追加されました");
    return executeSql(db, selectSql);
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return runSql(db, dropTableSql);
  })
  .finally(() => close(db));

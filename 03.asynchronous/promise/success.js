import sqlite3 from "sqlite3";
import { runSql, showSql, closeSql } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL)";
const insertSql = "INSERT INTO books (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM books";
const dropTableSql = "DROP TABLE books";

runSql(db, createTableSql)
  .then(() => {
    console.log("テーブルが作成されました");
  })
  .then(() => {
    return runSql(db, insertSql, bookTitle);
  })
  .then(() => {
    console.log("本が追加されました");
    return showSql(db, selectSql);
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return runSql(db, dropTableSql);
  })
  .finally(() => {
    return closeSql(db);
  });

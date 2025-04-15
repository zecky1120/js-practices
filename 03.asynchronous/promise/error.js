import sqlite3 from "sqlite3";
import { runSql, executeSql, close } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertSql = "INSERT INTO book (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM booka WHERE id = ?";
const dropTableSql = "DROP TABLE books";

runSql(db, createTableSql)
  .then(() => {
    console.log("テーブルが作成されました");
    return runSql(db, insertSql, bookTitle);
  })
  .then(() => runSql(db, insertSql))
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => executeSql(db, selectSql))
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return runSql(db, dropTableSql);
  })
  .finally(() => close(db));

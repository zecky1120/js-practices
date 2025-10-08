import sqlite3 from "sqlite3";
import { run, get, close } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
const insertSql = "INSERT INTO book (title) VALUES (?)";
const bookTitle = "JavaScript Primer 迷わないための入門";
const selectSql = "SELECT * FROM booka WHERE id = ?";
const dropTableSql = "DROP TABLE books";

run(db, createTableSql)
  .then(() => {
    console.log("テーブルが作成されました");
    return run(db, insertSql, bookTitle);
  })
  .then(() => run(db, insertSql))
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
    return get(db, selectSql, 1);
  })
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }    
  })
  .then(() =>{
    return run(db, dropTableSql);
  })
  .then(() => {
    console.log("テーブルを削除しました");
  })
  .finally(() => close(db));

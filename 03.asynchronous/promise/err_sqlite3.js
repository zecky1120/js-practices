#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./promise/err_test.db");
const runSql = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        reject(err);
      } else resolve("成功しました");
    });
  });
};
const showSql = (sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else resolve(rows);
    });
  });
};
const sql = `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)`;
const insertData = `INSERT INTO book (title) VALUES (?)`;
const promises = [
  runSql(sql),
  runSql(insertData, "JavaScript Primer 迷わないための入門"),
  showSql(`SELECT * FROM booka`),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("成功:", result.value);
    } else {
      console.log("失敗:", result.reason);
    }
  });
  console.log("テーブルを削除しました");
  runSql(`DELETE FROM books`);
});

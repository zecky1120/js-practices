#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./promise/test.db");
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
const insertData = `INSERT INTO books (title) VALUES (?)`;

runSql(sql)
  .then(() => {
    console.log("テーブルが作成されました");
    return runSql(insertData, "JavaScript Primer 迷わないための入門");
  })
  .then(() => {
    console.log("本が追加されました");
    return showSql(`SELECT * FROM books`).then((rows) => {
      rows.forEach((row) => {
        console.log(row);
      });
    });
  })
  .finally(() => {
    console.log("テーブルを削除しました");
    return runSql(`DELETE FROM books`);
  });

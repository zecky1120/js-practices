#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./async_await/err_test.db");
const sql = `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)`;
const insertData = `INSERT INTO book (title) VALUES (?)`;

async function runSql(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        reject(err.message);
      } else resolve();
    });
  });
}

async function showSql(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err.message);
      } else resolve(rows);
    });
  });
}

async function main() {
  await runSql(sql);
  console.log("テーブルが作成されました");
  try {
    await runSql(insertData, ["JavaScript Primer 迷わないための入門"]);
    console.log("本が追加されました");
  } catch (err) {
    console.error(err);
  }

  try {
    const rows = await showSql(`SELECT * FROM booka`);
    console.log(rows);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("テーブルを削除しました");
    await runSql(`DELETE FROM books`);
  }
}
main();

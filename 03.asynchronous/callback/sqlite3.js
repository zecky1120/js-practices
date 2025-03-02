#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./callback/test.db");
const createTableSql = `
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT UNIQUE NOT NULL
    )
`;

db.run(createTableSql, (err) => {
  if (err) {
    console.log(err.message);
  } else console.log("テーブルが作成されました");
  db.run(
    `INSERT INTO books (title) VALUES (?)`,
    "JavaScript Primer 迷わないための入門",
    (err) => {
      if (err) {
        console.log(err.message);
      } else console.log("本が追加されました");
      db.all(`SELECT * FROM books`, (err, rows) => {
        if (err) {
          console.log(err.message);
        } else console.log(rows);

        db.run(`DELETE FROM books`, (err) => {
          if (err) {
            console.log(err.message);
          } else console.log("無事テーブルを削除しました");
        });
      });
    },
  );
});

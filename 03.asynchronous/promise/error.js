#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runSql, showSql, closeSql } from "./promiseSql.js";

const db = new sqlite3.Database(":memory:");
const createTableSql = `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)`;
const insertSql = `INSERT INTO book (title) VALUES (?)`;
const bookTitle = `JavaScript Primer 迷わないための入門`;
const selectSql = `SELECT * FROM booka`;
const dropTableSql = `DROP TABLE books`;

runSql(db, createTableSql)
  .then(() => {
    console.log("テーブルが作成されました");
    return runSql(db, insertSql, bookTitle);
  })
  .then(() => {
    return runSql(db, insertSql);
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    return showSql(db, selectSql);
  })
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    console.log("テーブルを削除しました");
    return runSql(db, dropTableSql);
  })
  .finally(() => {
    return closeSql(db);
  });

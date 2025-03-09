#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runSql, showSql, closeSql } from "../sqlUtils.js";

const db = new sqlite3.Database(":memory:");
const createTableSql = `CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT UNIQUE NOT NULL)`;
const insertSql = `INSERT INTO books (title) VALUES (?)`;
const bookTitle = `JavaScript Primer 迷わないための入門`;
const selectSql = `SELECT * FROM books`;
const dropTableSql = `DROP TABLE books`;

await runSql(db, createTableSql);
console.log("テーブルが作成されました");
await runSql(db, insertSql, bookTitle);
console.log("本が追加されました");
await showSql(db, selectSql);
await runSql(db, dropTableSql);
console.log("テーブルを削除しました");
await closeSql(db);

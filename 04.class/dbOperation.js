import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./memo.db");
const dbName = "memos";
const createTableSql = `CREATE TABLE IF NOT EXISTS ${dbName} (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)`;
const insertSql = `INSERT INTO ${dbName}(content) VALUES (?)`;
const selectSql = `SELECT * FROM ${dbName}`;
const deleteSql = `DELETE FROM ${dbName} WHERE content = ?`;

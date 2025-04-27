import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./memo.db");
export const dbName = "memos";
export const createTableSql = `CREATE TABLE IF NOT EXISTS ${dbName} (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)`;
export const insertSql = `INSERT INTO ${dbName}(content) VALUES (?)`;
export const selectSql = `SELECT * FROM ${dbName}`;
export const deleteSql = `DELETE FROM ${dbName} WHERE content = ?`;

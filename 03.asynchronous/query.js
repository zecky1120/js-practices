import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");
export const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL)";
export const insertSql = "INSERT INTO books (title) VALUES (?)";
export const errorInsertSql = "INSERT INTO book (title) VALUES (?)";
export const bookTitle = "JavaScript Primer 迷わないための入門";
export const selectSql = "SELECT * FROM books WHERE id = ?";
export const errorSelectSql = "SELECT * FROM book WHERE id = ?";
export const bookId = 1;
export const dropTableSql = "DROP TABLE books";

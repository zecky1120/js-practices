import { run, get, close } from "../sqlUtils.js";
import {
  db,
  createTableSql,
  errorInsertSql,
  bookTitle,
  errorSelectSql,
  lastID,
  dropTableSql,
} from "../query.js";

try {
  await run(db, createTableSql);
  console.log("テーブルが作成されました");
  try {
    await run(db, errorInsertSql, bookTitle);
  } catch (err) {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  }
  try {
    await get(db, errorSelectSql, lastID);
  } catch (err) {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  }
  await run(db, dropTableSql);
  console.log("テーブルを削除しました");
} finally {
  await close(db);
}

import { run, get, close } from "../sqlUtils.js";
import {
  db,
  createTableSql,
  insertSql,
  bookTitle,
  selectSql,
  dropTableSql,
} from "../query.js";

try {
  await run(db, createTableSql);
  const result = await run(db, insertSql, bookTitle);
  console.log(`本(ID: ${result.lastID})が追加されました`);
  const row = await get(db, selectSql, result.lastID);
  console.log(`ID: ${row.id}, タイトル: ${row.title}`);
  await run(db, dropTableSql);
  console.log("テーブルを削除しました");
} finally {
  await close(db);
}

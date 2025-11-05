import { run, get, close } from "../sqlUtils.js";
import {
  db,
  createTableSql,
  insertSql,
  bookTitle,
  selectSql,
  dropTableSql,
} from "../query.js";

run(db, createTableSql)
  .then(() => run(db, insertSql, bookTitle))
  .then((result) => {
    console.log(`本(ID: ${result.lastID})が追加されました`);
    return get(db, selectSql, result.lastID);
  })
  .then((row) => {
    console.log(`ID: ${row.id}, タイトル: ${row.title}`);
    return run(db, dropTableSql);
  })
  .then(() => {
    console.log("テーブルを削除しました");
  })
  .finally(() => close(db));

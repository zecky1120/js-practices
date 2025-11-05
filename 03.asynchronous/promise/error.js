import { run, get, close } from "../sqlUtils.js";
import {
  db,
  createTableSql,
  errorInsertSql,
  bookTitle,
  errorSelectSql,
  bookId,
  dropTableSql,
} from "../query.js";

run(db, createTableSql)
  .then(() => {
    console.log("テーブルが作成されました");
    return run(db, errorInsertSql, bookTitle);
  })
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
    return get(db, errorSelectSql, bookId);
  })
  .catch((err) => {
    if (err instanceof Error && err.code === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => run(db, dropTableSql))
  .then(() => {
    console.log("テーブルを削除しました");
  })
  .finally(() => close(db));

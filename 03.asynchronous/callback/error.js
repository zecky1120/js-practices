import {
  db,
  createTableSql,
  errorInsertSql,
  bookTitle,
  errorSelectSql,
  bookId,
  dropTableSql,
} from "../query.js";

db.run(createTableSql, () => {
  console.log("テーブルが作成されました");
  db.run(errorInsertSql, bookTitle, (err) => {
    console.error(err.message);
    db.get(errorSelectSql, bookId, (err) => {
      console.error(err.message);
      db.run(dropTableSql, () => {
        console.log("テーブルを削除しました");
        db.close();
      });
    });
  });
});

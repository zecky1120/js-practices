import {
  db,
  createTableSql,
  insertSql,
  bookTitle,
  selectSql,
  dropTableSql,
} from "../query.js";

db.run(createTableSql, () => {
  db.run(insertSql, bookTitle, function () {
    console.log(`本(ID: ${this.lastID})が追加されました`);
    db.get(selectSql, this.lastID, (_, row) => {
      console.log(`ID: ${row.id}, タイトル: ${row.title}`);
      db.run(dropTableSql, () => {
        console.log("テーブルを削除しました");
        db.close();
      });
    });
  });
});

import readline from "readline";
import Select from "enquirer";
import DbOperation from "./dbOperation.js";

export default class Utility extends DbOperation {
  constructor() {
    super();
    this.createTable();
  }
  #createMemoFromPrompt() {
    return new Promise((resolve) => {
      const lines = [];
      const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      reader.on("line", (line) => {
        lines.push(line);
      });
      reader.on("close", () => {
        if (lines[0].trim() === "") {
          console.error("保存できません。1行目は必ず文字をいれてください。");
        } else {
          const memo = lines.join("\n");
          resolve(memo);
        }
      });
    });
  }
}

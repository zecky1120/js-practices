import readline from "readline";
import Select from "enquirer";
import MemoManager from "./memoManager.js";

export default class MemoFunction extends MemoManager {
  constructor() {
    super();
    this.createTable();
  }

  async listMemo() {
    try {
      const rows = await this.#buildMemoChoices();
      rows.map((row) => {
        console.log(row.name);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteMemo() {
    try {
      const result = await this.#selectFromPrompt("delete");
      await this.remove(result.value);
    } catch (error) {
      console.error(error);
    }
  }

  async readMemo() {
    try {
      const result = await this.#selectFromPrompt("see");
      console.log(result.value);
    } catch (error) {
      console.error(error);
    }
  }

  async createMemo() {
    try {
      const content = await this.#createMemoFromPrompt();
      await this.add(content);
    } catch (error) {
      console.error(error);
    }
  }

  async #buildMemoChoices() {
    try {
      const rows = await this.fetch();
      const transformRows = rows.map((row) => {
        const firstLine = row.content.split("\n")[0];
        return {
          name: firstLine,
          value: row.content,
        };
      });
      return transformRows;
    } catch (error) {
      console.error(error);
    }
  }

  async #selectFromPrompt(action) {
    try {
      const choices = await this.#buildMemoChoices();
      const answer = new Select().prompt({
        type: "select",
        name: "value",
        message: `Choose a note you want to ${action}:`,
        choices,
        result() {
          return this.focused.value;
        },
      });
      return answer;
    } catch (error) {
      console.error(error);
    }
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

#!/usr/bin/env node

import minimist from "minimist";
import Database from "./Database.js";
import Command from "./command.js";

const argv = minimist(process.argv.slice(1));

class MemoCLI {
  constructor(argv) {
    this.argv = argv;
    this.database = new Database("./memo.db", "memos");
    this.command = new Command(this.database);
  }

  async run() {
    try {
      await this.database.createTable();
      this.option();
    } catch (error) {
      console.error(error);
    }
  }

  option() {
    if (this.argv.l) {
      this.command.listMemo();
    } else if (this.argv.r) {
      this.command.readMemo();
    } else if (this.argv.d) {
      this.command.deleteMemo();
    } else {
      this.command.createMemo();
    }
  }
}

const memoCLI = new MemoCLI(argv);
memoCLI.run();

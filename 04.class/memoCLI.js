#!/usr/bin/env node

import minimist from "minimist";
import FileControl from "./fileControl.js";
import Command from "./command.js";

const argv = minimist(process.argv.slice(1));

class MemoCLI {
  constructor(argv) {
    this.argv = argv;
    this.fileControl = new FileControl();
    this.command = new Command(this.fileControl);
  }

  async run() {
    try {
      await this.fileControl.createTable();
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

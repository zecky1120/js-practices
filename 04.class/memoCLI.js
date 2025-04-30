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

  command() {
    if (this.argv.l) {
      this.memoFunction.listMemo();
    } else if (this.argv.r) {
      this.memoFunction.readMemo();
    } else if (this.argv.d) {
      this.memoFunction.deleteMemo();
    } else {
      this.memoFunction.createMemo();
    }
  }
}

const memoCLI = new MemoCLI(argv);
memoCLI.command();

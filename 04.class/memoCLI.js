#!/usr/bin/env node

import minimist from "minimist";
import MemoFunction from "./memoFunction.js";

const argv = minimist(process.argv.slice(1));

class MemoCLI {
  constructor(argv) {
    this.memoFunction = new MemoFunction();
    this.argv = argv;
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

const memo = new Memo(argv);
memo.command();

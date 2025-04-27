#!/usr/bin/env node

import minimist from "minimist";
import MemoFunction from "./memoFunction.js";

const utility = new Utility();
const argv = minimist(process.argv.slice(1));

class Memo {
  constructor(argv) {
    this.argv = argv;
  }
  command() {
    if (this.argv.l) {
      utility.listMemo();
    } else if (this.argv.r) {
      utility.readMemo();
    } else if (this.argv.d) {
      utility.deleteMemo();
    } else {
      utility.createMemo();
    }
  }
}

const memo = new Memo(argv);
memo.command();

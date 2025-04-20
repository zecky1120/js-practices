#!/usr/bin/env node

import minimist from "minimist";
import Utility from "./utility.js";

const utility = new Utility();
const argv = minimist(process.argv.slice(1));

class Memo {
  constructor(argv) {
    this.argv = argv;
  }
}

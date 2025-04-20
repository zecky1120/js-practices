import readline from "readline";
import Select from "enquirer";
import DbOperation from "./dbOperation.js";

export default class Utility extends DbOperation {
  constructor() {
    super();
    this.createTable();
  }
}

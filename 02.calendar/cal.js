#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const now = new Date();
const year = argv.y ?? now.getFullYear();
const month = argv.m ?? now.getMonth() + 1;
const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0);

console.log(`      ${month}月 ${year}     `);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(firstDate.getDay()));
for (let date = firstDate; date <= lastDate; date.setDate(date.getDate() + 1)) {
  process.stdout.write(String(date.getDate()).padStart(2));
  const isSaturday = date.getDay() === 6;
  const isLastDayOfMonth = date.getDate() === lastDate.getDate();
  if (isSaturday || isLastDayOfMonth) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}

#!/usr/bin/env node

import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = new Date();
const year = argv.y ?? new Date(today).getFullYear();
const month = argv.m ?? new Date(today).getMonth() + 1;
const startDate = new Date(year, month, 1).getDate();
const lastDate = new Date(year, month, 0).getDate();
const startDayOfWeek = new Date(year, month - 1, 1).getDay();

console.log(`      ${month}月 ${year}     `);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(startDayOfWeek));
for (let date = startDate; date <= lastDate; date++) {
  process.stdout.write(String(date).padStart(2));
  const saturDay = new Date(year, month - 1, date).getDay() === 6;
  const lastDay = date === lastDate;
  if (saturDay || lastDay) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
}

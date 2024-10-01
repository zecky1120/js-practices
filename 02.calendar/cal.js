#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));
const today = dayjs();
const year = argv.y ?? today.year();
const month = argv.m ?? today.month() + 1;
const firstDay = dayjs(`${year}-${month}-1`);
const lastDay = firstDay.daysInMonth();
const space = firstDay.day();
let currentDate = firstDay;

console.log(`      ${month}月 ${year}     `);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(space));
for (let date = 1; date <= lastDay; date++) {
  process.stdout.write(String(date).padStart(2));
  if ((space + date) % 7 === 0) {
    process.stdout.write("\n");
  } else if (date < lastDay) {
    process.stdout.write(" ");
  }
  currentDate = currentDate.add(1, "day");
}
process.stdout.write("\n");

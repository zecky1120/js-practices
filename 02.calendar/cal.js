#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));
const today = dayjs();
const year = argv.y ?? today.year();
const month = argv.m ?? today.month() + 1;
const endOfMonth = dayjs(`${year}-${month}`).endOf("month").daysInMonth();
const dayNumber = dayjs(`${year}-${month}`).day();

console.log(`      ${month}月 ${year}     `);
console.log("日 月 火 水 木 金 土");
process.stdout.write("   ".repeat(dayNumber));
for (let day = 1; day <= endOfMonth; day++) {
  let currentDay = dayjs(`${year}-${month}-${day}`);
  let dayOfWeek = currentDay.day();
  process.stdout.write(String(day).padStart(2));
  process.stdout.write(" ");
  if (dayOfWeek === 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n");

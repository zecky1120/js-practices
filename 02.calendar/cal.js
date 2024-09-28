#!/usr/bin/env node

import minimist from "minimist";
import dayjs from "dayjs";
import "dayjs/locale/ja.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.locale("ja");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const argv = minimist(process.argv.slice(2));
const today = dayjs();
const year = argv.y ?? today.year();
const month = argv.m ?? today.month() + 1;
console.log(month);
const endOfMonth = dayjs(`${year}-${month}`).endOf("month").daysInMonth();
const dayNumber = dayjs(`${year}-${month}`).day();
// const weekDay = ["日", "月", "火", "水", "木", "金", "土"];

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

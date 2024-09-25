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
const year = argv.y ?? dayjs().year();
const month = argv.m ?? dayjs().month() + 1;
const endOfMonth = dayjs(`${year}-${month}`).endOf("month").daysInMonth();
const dayNumber = dayjs(`${year}-${month}`).day();
const weekDay = ["日", "月", "火", "水", "木", "金", "土"];

console.log(`     ${month}月 ${year}     `);
console.log(weekDay.join(" "));
process.stdout.write("   ".repeat(dayNumber));
for (let d = 1; d <= endOfMonth; d++) {
  let currentDay = dayjs(`${year}-${month}-${d}`);
  let dayOfWeek = currentDay.day();
  process.stdout.write(String(d).padStart(2));
  process.stdout.write(" ");
  if (dayOfWeek === 6) {
    process.stdout.write("\n");
  }
}

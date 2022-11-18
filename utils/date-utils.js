import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const relativeTime = require("dayjs/plugin/relativeTime");
const country = require("dayjs/locale/ro");

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale(country);

export const NOW = dayjs.utc().format();

export const FROM_NOW = (date) => dayjs(date).fromNow();

export const yearMonthFormat = (year, month) => {
  return dayjs()
    .year(year)
    .month(month - 1)
    .format("MMMM YYYY");
};

export const dayMonthTime = (date) => dayjs(date).format("D MMM, HH:mm");

// all values are indicated in miliseconds
export const SECOND = 1000;
export const MINUTE = 60000;
export const HALF_HOUR = 1800000;
export const HOUR = 3600000;

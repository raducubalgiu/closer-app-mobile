import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const relativeTime = require("dayjs/plugin/relativeTime");
const country = require("dayjs/locale/ro");

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale(country);

export const NOW = dayjs.utc().format();

export const FROM_NOW = (date) => {
  return dayjs(date).fromNow();
};

// all values are indicated in miliseconds
export const SECOND = 1000;
export const MINUTE = 60000;
export const HALF_HOUR = 1800000;
export const HOUR = 3600000;

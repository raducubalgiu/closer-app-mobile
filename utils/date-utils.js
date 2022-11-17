import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export const NOW = dayjs.utc().format();

// all values are indicated in miliseconds
export const SECOND = 1000;
export const MINUTE = 60000;
export const HALF_HOUR = 1800000;
export const HOUR = 3600000;

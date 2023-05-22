import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const NOW = dayjs.utc().format();

export const FROM_NOW = (date: string) => dayjs(date).fromNow();
export const shortFormat = (date: Dayjs) => dayjs(date).format("YYYY-MM-DD");

export const addMinutesFromNow = (minutes: number) =>
  dayjs().startOf("day").add(minutes, "minutes").format("HH:mm");

export const dayMonthFormat = (date: Dayjs | null | string) => {
  if (date) {
    return dayjs(date)?.format("D MMM").split(".")[0];
  } else {
    return "";
  }
};
export const startOfDayFormatUTC = (date: string) => {
  return dayjs(date).utc().startOf("day").format();
};

export const yearMonthFormat = (year: number, month: number) => {
  return dayjs()
    .year(year)
    .month(month - 1)
    .format("MMM YYYY");
};

export const dayMonthTime = (date: string) =>
  dayjs(date).format("D MMM, HH:mm");

// all values are indicated in miliseconds
export const SECOND = 1000;
export const MINUTE = 60000;
export const HALF_HOUR = 1800000;
export const HOUR = 3600000;

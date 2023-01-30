import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Month } from "../models/month";
import { Day } from "../models/day";

type Config = {
  pastMonths?: number;
  noMonths?: number;
  disablePastDays?: boolean;
};
const config = {
  pastMonths: 0,
  noMonths: 5,
  disablePastDays: true,
};

export const useCalendarList = (others: Config = { ...config }) => {
  const calendarStart = others?.pastMonths
    ? dayjs().subtract(others?.pastMonths, "months")
    : dayjs();
  const calendarEnd = others?.noMonths ? others?.noMonths : config?.noMonths;

  let month = calendarStart.month();
  let year = calendarStart.year();
  const { t } = useTranslation();

  const displayMonth = (month: any, year: any) => {
    return dayjs().month(month).year(year).format("MMMM YYYY");
  };

  const generateCalendar = (month: any, year: any) => {
    const firstDateOfMonth = dayjs()
      .year(year)
      .month(month)
      .utc()
      .startOf("month");

    const lastDateOfMonth = dayjs()
      .year(year)
      .month(month)
      .utc()
      .endOf("month");

    const arrayOfDate: Day[] = [];

    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      const date = firstDateOfMonth.day(i);

      arrayOfDate.push({
        prevDates: true,
        date: date.utc().startOf("day"),
      });
    }

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({
        prevDates: false,
        disabled: others?.disablePastDays
          ? firstDateOfMonth.date(i).isBefore(dayjs().startOf("day"))
          : false,
        date: firstDateOfMonth.date(i).utc().startOf("day"),
      });
    }

    return arrayOfDate;
  };

  const DAYS_HEADER = ["D", "L", "M", "M", "J", "V", "S"];
  const DAYS_NAMES = [
    t("sun"),
    t("mon"),
    t("tue"),
    t("wed"),
    t("thu"),
    t("fri"),
    t("sat"),
  ];
  let MONTHS: Month[] = [];

  for (let i = 0; i <= calendarEnd; i++) {
    MONTHS.push({
      monthIndex: i,
      month: displayMonth(month + i, year),
      data: [...generateCalendar(month + i, year)],
    });
  }

  return {
    DAYS_HEADER,
    DAYS_NAMES,
    MONTHS,
  };
};

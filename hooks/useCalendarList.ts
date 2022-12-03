import dayjs from "dayjs";

export const useCalendarList = (noMonths: number = 5) => {
  let month = dayjs().month();
  let year = dayjs().year();

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

    const arrayOfDate = [];

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
        disabled: firstDateOfMonth.date(i).isBefore(dayjs().startOf("day")),
        date: firstDateOfMonth.date(i).utc().startOf("day"),
      });
    }

    return arrayOfDate;
  };

  const DAYS_HEADER = ["D", "L", "M", "M", "J", "V", "S"];
  let MONTHS = [];

  for (let i = 0; i <= noMonths; i++) {
    MONTHS.push({
      month: displayMonth(month + i, year),
      data: [{ list: [...generateCalendar(month + i, year)] }],
    });
  }

  return {
    DAYS_HEADER,
    MONTHS,
  };
};

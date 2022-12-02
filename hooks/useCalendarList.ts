import dayjs from "dayjs";

export const useCalendarList = () => {
  let month = dayjs().month();
  let year = dayjs().year();

  const displayMonth = (month: any, year: any) => {
    return dayjs().month(month).year(year).format("MMMM YYYY");
  };

  const generateCalendar = (month: any, year: any) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      const date = firstDateOfMonth.day(i);

      arrayOfDate.push({
        prevDates: true,
        date,
      });
    }

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({
        prevDates: false,
        disabled: firstDateOfMonth.date(i).isBefore(dayjs().startOf("day")),
        date: firstDateOfMonth.date(i),
        today:
          firstDateOfMonth.date(i).toDate().toDateString() ===
          dayjs().toDate().toDateString(),
      });
    }

    return arrayOfDate;
  };

  const DAYS_HEADER = ["D", "L", "M", "M", "J", "V", "S"];

  return {
    DAYS_HEADER,
    MONTHS: [
      {
        month: displayMonth(month, year),
        data: [{ list: [...generateCalendar(month, year)] }],
      },
      {
        month: displayMonth(month + 1, year),
        data: [{ list: [...generateCalendar(month + 1, year)] }],
      },
      {
        month: displayMonth(month + 2, year),
        data: [{ list: [...generateCalendar(month + 2, year)] }],
      },
    ],
  };
};

import dayjs from "dayjs";

export const Calendar = () => {
  let month = dayjs().month();
  let year = dayjs().year();

  const displayMonth = (month: any, year: any) => {
    return dayjs().month(month).year(year).format("MMMM YYYY");
  };

  const generateCalendar = (month: any, year: any) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    // create prefix date
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      const date = firstDateOfMonth.day(i);

      arrayOfDate.push({
        disabled: true,
        date,
      });
    }

    // generate current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({
        disabled: firstDateOfMonth.isBefore(dayjs()) ? true : false,
        date: firstDateOfMonth.date(i),
        today:
          firstDateOfMonth.date(i).toDate().toDateString() ===
          dayjs().toDate().toDateString(),
      });
    }

    const remaining = 42 - arrayOfDate.length;

    for (
      let i = lastDateOfMonth.date() + 1;
      i <= lastDateOfMonth.date() + remaining;
      i++
    ) {
      arrayOfDate.push({
        disabled: true,
        date: lastDateOfMonth.date(i),
      });
    }

    return arrayOfDate;
  };

  return [
    displayMonth(month, year),
    ...generateCalendar(month, year),
    displayMonth(month + 1, year),
    ...generateCalendar(month + 1, year),
    displayMonth(month + 2, year),
    ...generateCalendar(month + 2, year),
  ];
};

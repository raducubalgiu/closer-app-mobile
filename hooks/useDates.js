import moment from "moment";

export const useDates = () => {
  const MAX_DAYS = 120;

  const getStartTimeByDateAndHours = (date, hour) => {
    return moment
      .utc(date)
      .add(hour?.split(":")[0], "hours")
      .add(hour?.split(":")[1], "minutes");
  };

  // Using formats for Calendars
  const _minDate = moment().format("YYYY-MM-DD");
  const _maxDate = moment().add(MAX_DAYS, "days").format("YYYY-MM-DD");

  return {
    getStartTimeByDateAndHours,
    _minDate,
    _maxDate,
  };
};

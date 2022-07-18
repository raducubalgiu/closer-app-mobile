import moment from "moment";

export const useDates = () => {
  const SLOT = 29;
  const MAX_CALENDAR_DAYS = 120;

  const getStartTimeByDateAndHours = (date, hour) => {
    return moment
      .utc(date)
      .add(hour?.split(":")[0], "hours")
      .add(hour?.split(":")[1], "minutes");
  };

  const getEndTimeBySlot = (startTime) => {
    return moment(startTime).clone().utc().add(SLOT, "minutes").format();
  };

  const getStartSeconds = (startTime) => {
    let day = moment(startTime).day();
    day = day === 0 ? 7 : day;
    return (
      moment(startTime)
        .clone()
        .diff(moment(startTime).startOf("day"), "seconds") +
      86400 * day -
      86400
    );
  };

  const getLocationStartAndEnd = (openingHours, selectedDay) => {
    const hoursArr = Object.entries(openingHours);
    let dayNo = moment(selectedDay).day() - 1;
    dayNo = dayNo === -1 ? 6 : dayNo;

    const locationStart = hoursArr[dayNo][1].startTime;
    const locationEnd = hoursArr[dayNo][1].endTime;

    return {
      locationStart,
      locationEnd,
    };
  };

  // For Calendars
  const _minDate = moment().format("YYYY-MM-DD");
  const _maxDate = moment().add(MAX_CALENDAR_DAYS, "days").format("YYYY-MM-DD");

  return {
    getStartTimeByDateAndHours,
    getEndTimeBySlot,
    getStartSeconds,
    getLocationStartAndEnd,
    _minDate,
    _maxDate,
  };
};

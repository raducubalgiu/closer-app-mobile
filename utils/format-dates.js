import moment from "moment";

export const getStartTimeByDateAndHours = (date, hour) => {
  return moment
    .utc(date)
    .add(hour?.split(":")[0], "hours")
    .add(hour?.split(":")[1], "minutes");
};

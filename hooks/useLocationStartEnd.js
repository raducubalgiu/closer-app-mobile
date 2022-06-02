import moment from "moment";

export const useLocationStartEnd = (openingHours, selectedDay) => {
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

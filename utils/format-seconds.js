import moment from "moment";

export const formatSeconds = (seconds) => {
  return moment().startOf("day").seconds(seconds).format("HH:mm");
};

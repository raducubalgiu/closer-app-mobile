import moment from "moment";
import "moment/locale/ro";

export const dateFormat = (date) => {
  return moment(date).startOf("seconds").fromNow();
};

import { Dayjs } from "dayjs";

export interface Day {
  date: Dayjs;
  prevDates: boolean;
  disabled?: boolean;
}

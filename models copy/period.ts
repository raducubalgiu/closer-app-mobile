import { Dayjs } from "dayjs";

export interface Period {
  id: string;
  startDate: Dayjs;
  endDate: Dayjs;
  monthIndex: number;
}

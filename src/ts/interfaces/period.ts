import { Dayjs } from "dayjs";

export interface Period {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  startMinutes?: number | null;
  endMinutes?: number | null;
  monthIndex: number;
  key: string;
  title: string;
  description: string;
}

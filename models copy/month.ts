import { Day } from "./day";

export interface Month {
  monthIndex: number;
  month: string;
  data: Day[];
}

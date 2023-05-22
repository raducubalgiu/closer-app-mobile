export interface Period {
  startDate: string | null;
  endDate: string | null;
  startMinutes?: number | null;
  endMinutes?: number | null;
  monthIndex: number;
  key: string;
  title: string;
  description: string;
}

import dayjs from "dayjs";
import { useAuth } from "../hooks";

export const setFileName = (stem: string) => {
  const { user } = useAuth();

  return `${dayjs().utc(true).format()}_${user?.username}_${stem}`;
};

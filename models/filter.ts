import { Option } from "./option";

export interface Filter {
  _id: string;
  name: string;
  options: Option[];
}

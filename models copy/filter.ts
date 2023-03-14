import { Option } from "./option";

export interface Filter {
  id: string;
  name: string;
  options: Option[];
}

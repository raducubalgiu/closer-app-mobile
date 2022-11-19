import { Service } from "./service";
import { Option } from "./option";
import { User } from "./user";

export interface Product {
  _id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  priceDiscount: number;
  service: Service;
  option: Option;
  location: string;
  bookmarksCount: number;
  reservationsCount: number;
  user: User;
}

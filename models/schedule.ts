import { Product } from "./product";
import { Service } from "./service";
import { User } from "./user";

export interface Schedule {
  id: string;
  start: string;
  end: string;
  user: User;
  customer: string;
  service: Service;
  location: string;
  product: Product;
  channel: string;
  newClient: boolean;
  status: string;
  cancelMessage: string;
}

import { Product } from "./product";

export interface Schedule {
  start: string;
  end: string;
  user: string;
  customer: string;
  service: string;
  location: string;
  product: Product;
  channel: string;
  newClient: boolean;
  status: string;
  cancelMessage: string;
}

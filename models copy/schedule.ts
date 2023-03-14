import { Product } from "./product";
import { Service } from "./service";
import { User } from "./user";

export interface Schedule {
  id: string;
  _id: string;
  start: string;
  end: string;
  ownerId: User;
  customerId: {
    id: string;
    name: string;
    username: string;
    avatar: any;
    checkmark: boolean;
  };
  serviceId: Service;
  locationId: string;
  product: Product;
  channel: string;
  newClient: boolean;
  status: string;
  cancelMessage: string;
}

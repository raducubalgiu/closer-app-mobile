import { Product } from "./product";
import { Service } from "./service";
import { User } from "./user";

export interface Review {
  id: string;
  review: string;
  rating: number;
  userId: string;
  reviewerId: User;
  serviceId: Service;
  productId: Product;
  likesCount: 0;
  createdAt: string;
}

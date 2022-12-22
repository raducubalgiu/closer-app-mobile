import { Product } from "./product";
import { User } from "./user";

export interface Review {
  id: string;
  review: string;
  rating: number;
  userId: string;
  reviewerId: User;
  serviceId: string;
  productId: Product;
  likesCount: 0;
  createdAt: string;
}

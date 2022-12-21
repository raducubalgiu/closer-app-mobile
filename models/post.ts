import { Hashtag } from "./hashtag";
import { Product } from "./product";
import { Service } from "./service";
import { User } from "./user";

export interface Post {
  id: string;
  description: string;
  images: [{ url: string }];
  hashtags: Hashtag[];
  mentions: User[];
  product: Product;
  serviceId: Service;
  userId: User;
  bookable: boolean;
  fixed: boolean;
  postType: string;
  orientation: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  bookablesCount: number;
  active: boolean;
  expirationTime: string;
  createdAt: string;
}

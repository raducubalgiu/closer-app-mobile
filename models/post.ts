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
  userId: User[];
  bookable: boolean;
  fixed: boolean;
  product: Product;
  service: Service;
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

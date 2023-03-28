import { Hashtag } from "./hashtag";
import { Product } from "./product";
import { User } from "./user";

export interface Post {
  id: string;
  description: string;
  images: [{ url: string }];
  hashtags: Hashtag[];
  mentions: User[];
  product: Product;
  serviceId: string;
  userId: User;
  bookable: string | null;
  fixed: boolean;
  postType: string;
  orientation: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
  bookablesCount: number;
  active: boolean;
  viewsCount: number;
  expirationTime: string;
  createdAt: string;
}

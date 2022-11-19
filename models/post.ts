import { Hashtag } from "./hashtag";
import { Product } from "./product";
import { Service } from "./service";
import { User } from "./user";

export interface Post {
  _id: string;
  description: string;
  images: [];
  hashtags: Hashtag[];
  mentions: User[];
  user: User[];
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
}

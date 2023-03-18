import { Hashtag } from "./hashtag";
import { User } from "./user";

export interface SearchAll {
  id: string;
  userId: string;
  user?: User;
  hashtag?: Hashtag;
  word?: string;
}

import { Profession } from "./profession";

export interface User {
  id: string;
  name: string;
  username: string;
  profession: Profession;
  email: string;
  description: string;
  website: string;
  role: string;
  token: string;
  avatar: {
    url: string;
    key: string;
  };
  checkmark: boolean;
  followersCount: number;
  followingsCount: number;
  productsCount: number;
  postsCount: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  locationId: string;
  hours: any;
  phone: any;
  gender: string;
  status: string;
  settings: {
    private: boolean;
    viewsCount: string;
    viewLikes: string;
    comments: {
      create: string;
      view: string;
    };
    viewFollowings: string;
    tags: string;
    mentions: string;
    slot: number;
  };
}

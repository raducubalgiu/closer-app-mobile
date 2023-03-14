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
  avatar: any;
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
  settings: {
    private: boolean;
    status: string;
    likesCount: string;
    viewsCount: string;
    viewComments: string;
    viewFollowings: string;
    tags: string;
    mentions: string;
    slot: number;
  };
}
import { User } from "./user";

export interface Chat {
  id: string;
  summary: {
    name: string;
    username: string;
    avatar: any;
  };
  users: { isAdmin: boolean; user: User }[];
  latestMessage: {
    text: string;
    seenBy: User[];
    createdAt: string;
  };
  isAdmin: boolean;
  isGroupChat: boolean;
  updatedAt: string;
}

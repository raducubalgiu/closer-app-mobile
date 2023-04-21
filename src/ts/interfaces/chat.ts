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
  isGroupChat: boolean;
  updatedAt: string;
}

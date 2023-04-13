import { User } from "./user";

export interface ChatGroup {
  id: string;
  summary: {
    name: string;
    avatar: any;
  };
  users: { isAdmin: boolean; user: User }[] | [];
  latestMessage: {
    text: string;
    seenBy: User[];
  };
  isGroupChat: boolean;
  updatedAt: string;
}

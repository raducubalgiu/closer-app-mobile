import { User } from "./user";

type UserListItem = {
  user: User;
  isAdmin: boolean;
};

export interface Chat {
  id: string;
  summary: {
    name: string;
    avatar: any;
  };
  users: UserListItem[];
  latestMessage: {
    text: string;
    seenBy: User[];
  };
  isGroupChat: boolean;
  updatedAt: string;
}

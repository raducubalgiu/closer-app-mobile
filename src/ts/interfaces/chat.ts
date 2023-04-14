import { User } from "./user";

export interface Chat {
  id: string;
  summary: {
    name: string;
    avatar: any;
  };
  users: User[];
  latestMessage: {
    text: string;
    seenBy: User[];
  };
  isGroupChat: boolean;
  updatedAt: string;
}

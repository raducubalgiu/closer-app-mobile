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
    createdAt: string;
  };
  isGroupChat: boolean;
  updatedAt: string;
}

import { User } from "./user";

export interface Message {
  id: string;
  content: {
    text: string;
    url: string | null;
  };
  sender: User;
  liked: boolean;
  seenBy: User[];
  chatId: string;
  createdAt: string;
}

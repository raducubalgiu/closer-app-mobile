import { User } from "./user";

export interface MessageContent {
  text: string;
  url?: string | null;
}

export interface Message {
  id: string;
  content: MessageContent;
  sender: User | null;
  liked: boolean;
  seenBy: User[];
  chatId: string;
  createdAt: string;
}

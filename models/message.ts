export interface Message {
  id: string;
  message: { text: string; url: string };
  sender: string;
  receiver: string;
  liked: boolean;
  conversation: string;
  createdAt: string;
}

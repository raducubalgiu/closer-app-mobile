export interface Message {
  id: string;
  message: { text: string; url: string };
  sender: string;
  receiver: string;
  liked: boolean;
  conversationId: string;
  createdAt: string;
}

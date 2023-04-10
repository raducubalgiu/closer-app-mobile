import { Message } from "./message";
import { User } from "./user";

export interface Chat {
  id: string;
  name: string;
  message: string;
  updatedAt: string;
}

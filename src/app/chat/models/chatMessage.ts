export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time?: Date;
}

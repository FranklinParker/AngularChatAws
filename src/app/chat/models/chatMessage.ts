export interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  time?: Date;
}

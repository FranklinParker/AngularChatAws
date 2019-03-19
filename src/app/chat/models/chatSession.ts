import {ChatMessage} from './chatMessage';

export interface ChatSession {
  id: string;
  chatInitiatorName: string;
  chatResponderName: string;
  chatSessionActive: boolean;
  messages?: ChatMessage[];
}

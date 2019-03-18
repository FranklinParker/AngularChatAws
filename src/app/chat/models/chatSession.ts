export interface ChatSession {
  id: string;
  chatInitiatorName: string;
  chatResponderName: string;
  chatSessionActive: boolean;
  messages: any;
}

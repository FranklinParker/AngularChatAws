import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {ChatService} from '../services/chat.service';
import {ChatSession} from '../models/chatSession';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {
  private chatSessionSubject: BehaviorSubject<ChatSession> =
    new BehaviorSubject<ChatSession>(null);

  private polling = true;

  constructor(private chatService: ChatService) {

  }

  public getChatSessionObservable(): Observable<ChatSession> {
    return this.chatSessionSubject.asObservable();
  }

  initChatSessionListener(chatSessionId: string) {
    this.pollChatSessions(chatSessionId);
  }

  public shutDoneChatSessionListner() {
    this.polling = false;
  }

  private pollChatSessions(chatSessionId: string) {
    setTimeout(async () => {
      if (this.polling) {
        const chatSession: ChatSession =
          await this.chatService.getChatSessionById(chatSessionId);
        this.chatSessionSubject.next(chatSession);
        console.log('polling chat session')
        this.pollChatSessions(chatSessionId);

      }

    }, 1000);
  }
}

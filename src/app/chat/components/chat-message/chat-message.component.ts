import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChatSession} from '../../models/chatSession';
import {ChatService} from '../../services/chat.service';
import {ChatMessage} from '../../models/chatMessage';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  messages = 'Begin Chat';
  chatSession: ChatSession;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
                chatSession: ChatSession,
                isAccountManager: boolean
              },
              public dialogRef: MatDialogRef<any>,
              private chatService: ChatService) {
    this.chatSession = data.chatSession;
  }

  get sendAllowed() {
    return this.message && this.message.length > 0;
  }

  async ngOnInit() {
    this.pollChatSession();
  }

  pollChatSession() {
    setTimeout(async () => {
      const newChatSess = await this.chatService.getChatSessionById(this.chatSession.id);
      console.log('got new Chat Session messages', newChatSess.messages);
      this.pollChatSession();

    }, 5000);
  }

  async onSend() {

    const chatMessages: ChatMessage[] = [
      {
        id: 0,
        sender: this.data.isAccountManager ? this.chatSession.chatResponderName :
          this.chatSession.chatInitiatorName,
        message: this.message
      }
    ];
    if (this.message && this.message.length > 0) {
      const sendResult = await this.chatService.sendChatMessages(chatMessages, this.chatSession.id);
      console.log('send result', sendResult);

      this.messages += '\n' + this.message;
      this.message = '';
    }
  }

}

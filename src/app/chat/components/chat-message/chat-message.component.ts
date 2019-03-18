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
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
                chatSession: ChatSession,
                isAccountManager: boolean
              },
              public dialogRef: MatDialogRef<any>,
              private chatService: ChatService) {
  }

  get sendAllowed() {
    return this.message && this.message.length > 0;
  }

  ngOnInit() {
  }

  async onSend() {

    if (this.message && this.message.length > 0) {
      this.messages += '\n' + this.message;
      this.message = '';
    }
    const chatSession: ChatSession = this.data.chatSession;
    const chatMessages: ChatMessage[] = [
      {
        id: 0,
        sender: this.data.isAccountManager ? chatSession.chatResponderName :
          chatSession.chatInitiatorName,
        message: this.message
      }
    ];
    await this.chatService.sendChatMessages(chatMessages, chatSession.id);

  }

}

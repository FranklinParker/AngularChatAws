import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UUID} from 'angular2-uuid';

import {ChatSession} from '../../models/chatSession';
import {ChatService} from '../../services/chat.service';
import {ChatMessage} from '../../models/chatMessage';
import {ChatMessageService} from '../../service/chat-message.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  providers: [
    ChatMessageService
  ]
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  messages = 'Begin Chat';
  chatSession: ChatSession;
  message: string;
  closeRequested = false;
  chatMessageSubs: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
                chatSession: ChatSession,
                isAccountManager: boolean
              },
              public dialogRef: MatDialogRef<any>,
              private chatService: ChatService,
              private chatMessageService: ChatMessageService) {
    this.chatSession = data.chatSession;
    this.chatSession.chatSessionActive = true;

  }

  get sendAllowed() {
    return this.message && this.message.length > 0;
  }

  ngOnDestroy(): void {
    this.chatMessageService.shutDoneChatSessionListner();
    this.chatMessageSubs.unsubscribe();
  }

  async ngOnInit() {
    this.chatMessageSubs = this.chatMessageService
      .getChatSessionObservable().subscribe((chatSession: ChatSession) => {
        if (chatSession) {
          this.getNewChatSession(chatSession);
        }
      });
    this.chatMessageService.initChatSessionListener(this.chatSession.id);
  }


  getNewChatSession(newChatSess: ChatSession) {
    if (newChatSess.chatSessionActive === false) {
      this.chatMessageService.shutDoneChatSessionListner();
      this.chatSession.chatSessionActive = false;
      this.messages += '\n Chat has been terminated on other Side';
    } else {
      if (newChatSess.messages) {
        this.addNewMessages(newChatSess.messages);
      }
    }
  }

  addNewMessages(messages: ChatMessage[]) {
    if (!this.chatSession.messages) {
      this.chatSession.messages = [];
    }
    messages.forEach((chatMessage: ChatMessage) => {
      const matchMessage = this.chatSession.messages.find((mess: ChatMessage) => mess.id === chatMessage.id);
      if (!matchMessage) {
        this.messages += '\n' + chatMessage.sender + ': ' +
          chatMessage.message;
        this.chatSession.messages.push(chatMessage);
      }
    });
  }

  async onSend() {
    const chatMessage: ChatMessage = {
      id: UUID.UUID(),
      sender: this.data.isAccountManager ? this.chatSession.chatResponderName :
        this.chatSession.chatInitiatorName,
      message: this.message
    };

    const chatMessages = [];
    this.chatSession.messages.forEach((chatMess: ChatMessage) => {
      chatMessages.push(chatMess);
    })
    chatMessages.push(chatMessage);
    if (this.message && this.message.length > 0) {
      const sendResult = await this.chatService.sendChatMessages(chatMessages, this.chatSession.id);
      this.message = '';
    }
  }


  async onClose() {
    if (this.chatSession.chatSessionActive) {
      this.closeRequested = true;
    } else {
      this.dialogRef.close({client: true});
    }
  }

  async onCloseConfirm() {
    await this.chatService.quitChat(this.chatSession);
    this.dialogRef.close({client: true});
  }

  onCancelClose() {
    this.closeRequested = false;
  }
}

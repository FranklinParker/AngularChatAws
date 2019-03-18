import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';

import {ChatSession} from '../../models/chatSession';
import {ChatMessageComponent} from '../chat-message/chat-message.component';
import {User} from '../../../shared/models/user';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.scss']
})
export class ChatSessionComponent implements OnInit {
  @Input() chatSession: ChatSession;
  @Input() user: User;

  constructor(private chatService: ChatService,
              private matDialog: MatDialog) {

  }

  ngOnInit() {
  }

  async onAnswerChat() {
    const resp = await this.chatService.takeChat(this.chatSession, this.user);
    this.chatSession.chatResponderName = this.user.name;
    this.matDialog.open(ChatMessageComponent, {
      data: {
        chatSession: this.chatSession,
        isAccountManager: true
      },
      width: '85%',
      disableClose: true
    });

  }

}

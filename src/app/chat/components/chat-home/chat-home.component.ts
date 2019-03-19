import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';
import {UUID} from 'angular2-uuid';

import {ChatService} from '../../services/chat.service';
import {ChatSession} from '../../models/chatSession';
import {User} from '../../../shared/models/user';
import {LoginService} from '../../../shared/services/login.service';
import {ChatMessageComponent} from '../chat-message/chat-message.component';

/**
 *
 * https://icomoon.io/app/#/select
 */
@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent implements OnInit, OnDestroy {
  ACCT_EXEC = 'AcctExec';
  leftNavOpen = true;
  user: User;
  chatSessions: ChatSession[] = [];
  sub: Subscription;
  requestChatUid: string;

  constructor(private chatService: ChatService,
              private loginService: LoginService,
              private matDialog: MatDialog) {
  }

  get isAccountExec() {
    return this.user && this.user.userType === this.ACCT_EXEC;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async ngOnInit() {
    this.chatSessions = await this.chatService.getActiveChatSessions();
    this.sub = this.loginService.getLoggedInUserAsObservable()
      .subscribe((user: User) => {
        this.user = user;
        if (user.userType === this.ACCT_EXEC) {
          this.pollChatSessions();
        }
        console.log('user', user);
      });

  }

  pollChatSessions() {
    setTimeout(async () => {
      this.chatSessions = await this.chatService.getActiveChatSessions();
      this.pollChatSessions();
    }, 4000);

  }

  onLeftNavClose() {
    this.leftNavOpen = false;
  }

  async onRequestChat() {
    this.requestChatUid = UUID.UUID();
    const resp = await this.chatService.requestChat(this.user.name,
      this.requestChatUid);
    this.pollChatSession();
  }

  pollChatSession() {
    setTimeout(async () => {
      const chatSess: ChatSession = await this.chatService.getChatSessionById(this.requestChatUid);
      if (chatSess.chatSessionActive) {
        this.requestChatUid = undefined;
        this.matDialog.open(ChatMessageComponent, {
          data: {
            chatSession: chatSess,
            isAccountManager: false
          },
          width: '85%',
          disableClose: true
        });
      } else {
        this.pollChatSession();
      }

    }, 5000);
  }

  onLeftNavOpen() {
    this.leftNavOpen = true;
  }

  onNotImplemented() {
    alert('Feature Not Implemented');
  }

}

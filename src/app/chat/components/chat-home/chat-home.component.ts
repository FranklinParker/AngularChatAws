import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ChatSession} from '../../models/chatSession';
import {User} from '../../../shared/models/user';
import {LoginService} from '../../../shared/services/login.service';
import {Subscription} from 'rxjs';

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
  leftNavOpen = true;
  user: User;
  chatSessions: ChatSession[] = [];
  sub: Subscription;

  constructor(private chatService: ChatService,
              private loginService: LoginService) {
  }

  get isAccountExec() {
    return this.user && this.user.userType === 'AcctExec';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async ngOnInit() {
    this.chatSessions = await this.chatService.getActiveChatSessions();
    this.sub  = this.loginService.getLoggedInUserAsObservable()
      .subscribe((user: User) => {
        this.user = user;
        console.log('user', user);
      });

  }

  onLeftNavClose() {
    this.leftNavOpen = false;
  }

  onLeftNavOpen() {
    this.leftNavOpen = true;
  }

}

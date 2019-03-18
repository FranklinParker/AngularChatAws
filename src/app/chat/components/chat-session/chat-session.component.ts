import {Component, OnInit, Input} from '@angular/core';
import {ChatSession} from '../../models/chatSession';
import {MatDialog} from '@angular/material';
import {ChatMessageComponent} from '../chat-message/chat-message.component';
import {LoginService} from '../../../shared/services/login.service';
import {User} from '../../../shared/models/user';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.scss']
})
export class ChatSessionComponent implements OnInit {
  @Input() chatSession: ChatSession;
  loggedInUser: User;

  constructor(private chatService: ChatService,
              private matDialog: MatDialog,
              private loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.getLoggedInUserAsObservable()
      .subscribe((user: User) => {
        this.loggedInUser = user;
      });
  }

  async onAnswerChat() {
    this.chatSession.chatResponderName = this.loggedInUser.name;
    const resp = await this.chatService.takeChat(this.chatSession);
    this.matDialog.open(ChatMessageComponent, {
      data: {chatSession: this.chatSession},
      width: '85%',
      disableClose: true
    });

  }

}

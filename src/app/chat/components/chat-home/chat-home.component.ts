import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ChatSession} from '../../models/chatSession';

/**
 *
 * https://icomoon.io/app/#/select
 */
@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent implements OnInit {
  leftNavOpen = true;
  chatSessions: ChatSession[] = [];

  constructor(private chatService: ChatService) {
  }

  async ngOnInit() {
    this.chatSessions = await this.chatService.getActiveChatSessions();

  }

  onLeftNavClose() {
    this.leftNavOpen = false;
  }

  onLeftNavOpen() {
    this.leftNavOpen = true;
  }

}

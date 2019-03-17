import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';

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
  firstName: string;

  constructor(private chatService: ChatService) {
  }

  async ngOnInit() {
    const result = await this.chatService.getActiveChatSessions();
    if (result && result['Items']) {
      this.firstName = result['Items'][0]['chat'];

    }
  }

  onLeftNavClose() {
    this.leftNavOpen = false;
  }

  onLeftNavOpen() {
    this.leftNavOpen = true;
  }

}

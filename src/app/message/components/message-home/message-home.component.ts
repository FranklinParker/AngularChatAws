import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';

/**
 *
 * https://icomoon.io/app/#/select
 */
@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.scss']
})
export class MessageHomeComponent implements OnInit {
  leftNavOpen = true;
  firstName: string;

  constructor(private messageService: MessageService) {
  }

  async ngOnInit() {
    const result = await this.messageService.getAllMessages();
    if (result && result['Items']) {
      this.firstName = result['Items'][0]['FullName'];

    }
  }

  onLeftNavClose() {
    this.leftNavOpen = false;
  }

  onLeftNavOpen() {
    this.leftNavOpen = true;
  }

}

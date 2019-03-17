import { Component, OnInit, Input } from '@angular/core';
import {ChatSession} from '../../models/chatSession';
import {MatDialog} from '@angular/material';
import {ChatMessageComponent} from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.scss']
})
export class ChatSessionComponent implements OnInit {
  @Input() chatSession: ChatSession;
  constructor( private matDialog: MatDialog) {

  }

  ngOnInit() {
  }
  onAnswerChat() {
    this.matDialog.open(ChatMessageComponent, {
      data: { isAddNew: true },
      width: '85%',
      disableClose: true
    });

  }

}

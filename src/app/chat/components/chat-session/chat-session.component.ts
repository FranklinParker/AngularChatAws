import { Component, OnInit, Input } from '@angular/core';
import {ChatSession} from '../../models/chatSession';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.scss']
})
export class ChatSessionComponent implements OnInit {
  @Input() chatSession: ChatSession;
  constructor() { }

  ngOnInit() {
  }

}

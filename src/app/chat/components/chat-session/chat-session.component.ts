import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.scss']
})
export class ChatSessionComponent implements OnInit {
  @Input() description: string;
  constructor() { }

  ngOnInit() {
  }

}

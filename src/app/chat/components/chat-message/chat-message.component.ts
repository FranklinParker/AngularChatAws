import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChatSession} from '../../models/chatSession';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  messages = 'Begin Chat';
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
                chatSession: ChatSession,
                isAccountManager: boolean
              },
              public dialogRef: MatDialogRef<any>) {
  }

  get sendAllowed() {
    return this.message && this.message.length > 0;
  }

  ngOnInit() {
  }

  onSend() {

    if (this.message && this.message.length > 0) {
      this.messages += '\n' + this.message;
      this.message = '';
    }

  }

}

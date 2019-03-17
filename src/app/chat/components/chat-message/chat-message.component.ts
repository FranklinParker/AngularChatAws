import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChatSession} from '../../models/chatSession';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: { chatSession: ChatSession},
              public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
  }

}

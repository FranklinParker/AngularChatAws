import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatHomeComponent } from './components/chat-home/chat-home.component';
import {SharedModule} from '../shared/shared.module';
import { ChatSessionComponent } from './components/chat-session/chat-session.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';

@NgModule({
  declarations: [
      ChatHomeComponent,
      ChatSessionComponent,
      ChatMessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ChatMessageComponent
  ]
})
export class ChatModule { }

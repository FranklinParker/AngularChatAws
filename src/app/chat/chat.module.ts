import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatHomeComponent } from './components/chat-home/chat-home.component';
import {SharedModule} from '../shared/shared.module';
import { ChatSessionComponent } from './components/chat-session/chat-session.component';

@NgModule({
  declarations: [
      ChatHomeComponent,
      ChatSessionComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }

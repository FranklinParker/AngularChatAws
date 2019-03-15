import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageHomeComponent } from './components/message-home/message-home.component';
import {SharedModule} from '../shared/shared.module';
import { MessageItemComponent } from './components/message-item/message-item.component';

@NgModule({
  declarations: [
      MessageHomeComponent,
      MessageItemComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule
  ]
})
export class MessageModule { }

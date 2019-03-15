import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessageHomeComponent} from './components/message-home/message-home.component';

const routes: Routes = [
  {
    path: '',
    component: MessageHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './core/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {animation: {page: 'homePage'}}

  },
  {
    path: 'message',
    loadChildren: './message/message.module#MessageModule',
    data: {animation: {page: 'messagePage'}}

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

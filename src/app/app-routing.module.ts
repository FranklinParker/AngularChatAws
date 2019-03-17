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
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule',
    data: {animation: {page: 'chatHomePage'}}

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

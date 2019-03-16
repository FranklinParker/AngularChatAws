import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routeStateTrigger} from './routingAnimations';
import {LoginService} from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeStateTrigger
  ]
})
export class AppComponent {
  title = 'AngularMaterialStyling';

  constructor(private loginService: LoginService){

  }
  getAnimationData(outlet: RouterOutlet) {
    const routeData = outlet.activatedRouteData['animation'];
    if (!routeData) {
      return 'rootPage';
    }
    return routeData['page'];
  }

  get loggedIn() {
    return this.loginService.getLoggedInUser();
  }



}

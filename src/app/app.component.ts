import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {routeStateTrigger} from './routingAnimations';
import {LoginService} from './shared/services/login.service';
import {User} from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeStateTrigger
  ]
})
export class AppComponent implements OnInit {
  title = 'AngularMaterialStyling';
  user: User;

  constructor(private loginService: LoginService) {

  }

  get loggedIn() {
    return this.user;
  }

  ngOnInit(): void {
    this.loginService.getLoggedInUserAsObservable()
      .subscribe((user: User) => {
        this.user = user;

      });
  }

  getAnimationData(outlet: RouterOutlet) {
    const routeData = outlet.activatedRouteData['animation'];
    if (!routeData) {
      return 'rootPage';
    }
    return routeData['page'];
  }


}

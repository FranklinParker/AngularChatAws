import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {User} from '../../../shared/models/user';
import {LoginService} from '../../../shared/services/login.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  loggedInUser: User;
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private loginService: LoginService) {
  }

  get displayName() {
    return this.loggedInUser.name;
  }

  ngOnInit() {
    this.loginService.getLoggedInUserAsObservable()
      .subscribe((user: User)=>{
        this.loggedInUser = user;
      });
  }

  onLogout() {
    this.loginService.logout();
  }

  onToggle() {

    this.sidebarToggle.emit();
  }

}

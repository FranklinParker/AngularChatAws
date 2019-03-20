import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from '../../services/login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string;
  userType: string;
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loginService.login(this.name, this.userType);
    this.router.navigateByUrl('/chat');
  }
}

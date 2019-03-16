import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string;
  userType: string;
  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this.name, this.userType);

  }
}

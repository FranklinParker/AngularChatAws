import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

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

  onSubmit() {
    this.loginService.login(this.name, this.userType);
    this.router.navigateByUrl('/chat');
  }
}

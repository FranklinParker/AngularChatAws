import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {namespaceMathML} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInUser: User;
  private logg

  constructor() { }
  public getLoggedInUser(){
    return this.loggedInUser;
  }

  public login(name: string, type: string) {
    this.loggedInUser = {
      name: name,
      userType: type
    };
  }
}

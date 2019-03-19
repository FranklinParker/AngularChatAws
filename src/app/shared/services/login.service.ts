import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {namespaceMathML} from '@angular/core/src/render3';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInUser = new BehaviorSubject<User>(undefined);

  constructor() {
  }

  public getLoggedInUserAsObservable(): Observable<User> {
    return this.loggedInUser.asObservable();
  }

  public login(name: string, type: string) {
    this.loggedInUser.next({name: name, userType: type});
  }

  public logout() {
    this.loggedInUser.next(undefined);
  }

}

import { User } from './user.model'
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';   //to unlock functions like map()
import { Observable } from "rxjs";
import { ErrorService } from '../errors/error.service'

@Injectable()   //angular 2 injector can only inject services into classes that have some form of metadata (like decorator) attached to it
                //@Injectable simply adds some metadata so that injector can inject the service

export class AuthService {
  constructor(private http: Http, private errorService: ErrorService){}

  signUp(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());  //catch fnuction allows us to run our own code before proceeding with the default actions
      return Observable.throw(error.json());
    });
  }

  signIn(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => {
      this.errorService.handleError(error.json());  //catch fnuction allows us to run our own code before proceeding with the default actions
      return Observable.throw(error.json());
    });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}

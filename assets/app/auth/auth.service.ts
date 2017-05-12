import { User } from './user.model'
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';   //to unlock functions like map()
import { Observable } from "rxjs";

@Injectable()   //angular 2 injector can only inject services into classes that have some form of metadata (like decorator) attached to it
                //@Injectable simply adds some metadata so that injector can inject the service

export class AuthService {
  constructor(private http: Http){}

  signUp(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/user', body, {headers: headers}).map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));
  }
}

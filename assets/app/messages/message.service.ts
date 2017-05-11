import { Message } from "./message.model"
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';   //to unlock functions like map()
import { Observable } from "rxjs";

@Injectable()   //angular 2 injector can only inject services into classes that have some form of metadata (like decorator) attached to it
                //@Injectable simply adds some metadata so that injector can inject the service

export class MessageService {
  private messages: Message[] = [];

  constructor(private http: Http){}   //to inject angular's http service

  addMessage(message: Message){
    this.messages.push(message);
    const body = JSON.stringify(message);
    return this.http.post('http://localhost:3000/messages',body).map((response: Response)=>response.json()).catch((error: Response)=>Observable.throw(error.json()));  //body - content to post ... NOTE!! this is not a post request , this only sets up an observable which holds the post requests to send when something subscribes to this observable
    //this observable should be subscribed by the component which calls addMessage()
    //response.json() strips headersof response, converts the data into json format
  }

  getMessages(){
    return this.messages;
  }

  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message),1);
  }
}

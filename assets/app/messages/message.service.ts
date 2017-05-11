import { Message } from "./message.model"
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';   //to unlock functions like map()
import { Observable } from "rxjs";

@Injectable()   //angular 2 injector can only inject services into classes that have some form of metadata (like decorator) attached to it
                //@Injectable simply adds some metadata so that injector can inject the service

export class MessageService {
  private messages: Message[] = [];
  messageEdit = new EventEmitter<Message>();  //returns a message

  constructor(private http: Http) {}   //to inject angular's http service

  addMessage(message: Message) {
    this.messages.push(message);
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});  //NOTE!! without this header, the body is considered as plain text and so there will be no key value pairs-->error
    return this.http.post('http://localhost:3000/message', body, {headers: headers}).map((response: Response) => response.json()).catch((error: Response) => Observable.throw(error.json()));  //body - content to post ... NOTE!! this is not a post request , this only sets up an observable which holds the post requests to send when something subscribes to this observable
    //this observable should be subscribed by the component which calls addMessage()
    //response.json() strips headersof response, converts the data into json format
  }

  getMessages() {
    return this.http.get('http://localhost:3000/message')//.map //here it is localhost:3000/message instead of messages as backend uses /messages
      .map((response: Response) => {
      const messages = response.json().obj; //obj is the field returning result in ./messages.js
      let transformedMessages: Message[] = [];  //since Message object in backend is different from frontend, we have to convert it to type defined in ./messages/message.model.ts
      for(let message of messages) {
        transformedMessages.push(new Message(message.content, "Me", message.id, null  ));
      }
      this.messages = transformedMessages;  //since 'messages' is referenced in other parts
      return transformedMessages;
    })
    .catch((error: Response) => Observable.throw(error.json()));
  }

  editMessage(message: Message) {
    this.messageEdit.emit(message);
  }

  updateMessage(message: Message) {
    
  }

  deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message),1);
  }
}

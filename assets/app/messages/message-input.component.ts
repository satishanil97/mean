import { Component } from '@angular/core';
import { MessageService } from "./message.service"
import { Message } from "./message.model"

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  providers: [MessageService]   //blueprints that we want angular2 to know about - angular 2 dependency injector
})
export class MessageInputComponent {
  constructor(private messageService: MessageService){}   //angular 2 will automatically do this

  onSave(value: string){
    console.log(value);
    const message = new Message(value,'Me');
    this.messageService.addMessage(message);
  }
}

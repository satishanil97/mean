import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from "./message.service"
import { Message } from "./message.model"

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})

export class MessageInputComponent {
  constructor(private messageService: MessageService){}   //angular 2 will automatically create a local instance of MessageService

  onSubmit(form: NgForm){
    //console.log(form);
    const message = new Message(form.value.content,'Me');
    this.messageService.addMessage(message).subscribe(data => console.log(data), error => console.error(error));
    //subscribe() has 3 callbacks -- Success-(when data is recieved), Error-(When error occures), Complete-(When observable stops--knowing that no more data will arrive)
    form.resetForm();
  }
}

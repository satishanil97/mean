import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from "./message.service"
import { Message } from "./message.model"

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit {
  message: Message;

  constructor(private messageService: MessageService){}   //angular 2 will automatically create a local instance of MessageService

  onSubmit(form: NgForm){
    if(this.message) {  //Edit existing message
      this.message.content = form.value.content;
      this.messageService.updateMessage(this.message).subscribe(result => console.log(result), error => console.error(error));
      this.message = null;    //otherwise the form will not reset
    }

    else {  //Create new message
      const message = new Message(form.value.content,'Me');
      this.messageService.addMessage(message).subscribe(data => console.log(data), error => console.error(error));
      //subscribe() has 3 callbacks -- Success-(when data is recieved), Error-(When error occures), Complete-(When observable stops--knowing that no more data will arrive)
    }
    //console.log(form);
    form.resetForm();
  }

  onClear(form: NgForm) {
    this.message = null;
    form.resetForm();
  }

  ngOnInit(){
    this.messageService.messageEdit.subscribe(
      (message: Message) => this.message = message
    );
  }
}

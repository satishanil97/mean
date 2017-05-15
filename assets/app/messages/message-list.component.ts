import { Component,OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service"

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message [message]="message"
                   *ngFor="let message of messages">
      </app-message>
    </div>
  `
})

export class MessageListComponent implements OnInit{    //the ngOninit lifecycle hooks is a life cycle hook that angular2 reaches when creating a component that has more than just basic initializations
  messages: Message[];
  constructor(private messageService: MessageService){}

  ngOnInit(){
    this.messageService.getMessages()
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      },

      error => console.log(error)
    );
  }
}

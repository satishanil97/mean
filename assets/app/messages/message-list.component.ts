import { Component,OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service"

@Component({
  selector: 'app-message-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message [message]="message"
                   (editClicked)="message.content = $event"
                   *ngFor="let message of messages">
      </app-message>
    </div>
  `,
  providers: [MessageService] //this should'nt be here..it should be common in app component
})

export class MessageListComponent implements OnInit{    //the ngOninit lifecycle hooks is a life cycle hook that angular2 reaches when creating a component that has more than just basic initializations
  messages: Message[];
  constructor(private messageService: MessageService){}

  ngOnInit(){
    this.messages = this.messageService.getMessages();
  }
}

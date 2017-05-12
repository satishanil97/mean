import { Component, Input } from "@angular/core";
import { Message } from "./message.model"
import { MessageService } from "./message.service"

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [`
      .author {
        display: inline-block;
        font-style: italic;
        font-size: 12px;
        width: 80%;
      }

      .config {
        display: inline-block;
        text-align: right;
        font-size: 12px;
        width: 19%;
      }
  `]
})

export class MessageComponent {
  @Input() message: Message;

  constructor(private messageService: MessageService){}

  onEdit() {
    this.messageService.editMessage(this.message);
  }

  onDelete() {
    this.messageService.deleteMessage(this.message).subscribe(result => console.log(result), error => console.error(error));
  }

  belongsToUser() { //function to check if message belongs to current user
    return localStorage.getItem('userId') == this.message.userId;
  }
}

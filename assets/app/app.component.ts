import { Component } from '@angular/core';
import { Message } from './messages/message.model'
import { MessageService } from "./messages/message.service"

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
   //no need of Message Service as a provider anymore as it is included in MessageModule
})

export class AppComponent {

}

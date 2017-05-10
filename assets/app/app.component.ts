import { Component } from '@angular/core';
import { Message } from './messages/message.model'
import { MessageService } from "./messages/message.service"

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService] //by adding this here instead of in each individual sub component, we have made all sub-components access a common service instance from MessageService - now, message list will get displayed properly
})

export class AppComponent {

}

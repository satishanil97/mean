import { Component } from '@angular/core';
import { Message } from './messages/message.model'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
    //the MessageService should be added as a provider here not in each individual sub component so that they can access a shared instance of MessageService
})

export class AppComponent {

}

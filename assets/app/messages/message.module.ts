import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import{  MessagesComponent }from './messages.component'
import{  MessageComponent }from './message.component'
import { MessageListComponent } from './message-list.component'
import { MessageInputComponent } from './message-input.component'
import { MessageService } from './message.service'
import{ FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    MessagesComponent,
    MessageListComponent,
    MessageComponent,
    MessageInputComponent
  ],

  imports: [
    CommonModule, //for things like ngFor etc
    FormsModule
  ],
  providers: [MessageService]
})

export class MessageModule {

}

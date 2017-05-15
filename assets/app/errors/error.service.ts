import { EventEmitter } from '@angular/core';
import { Error } from './error.model'

export class ErrorService {   //call in message.service (in catch part of each function) and in auth.service
  errorOccurred = new EventEmitter<Error>();
  handleError(error:any) {
    const errorData = new Error(error.title, error.error.message);
    this.errorOccurred.emit(errorData);
  }
}

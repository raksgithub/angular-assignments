import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {

  constructor() { }

  log(message: string) {
    console.log(message);
  }

  logMyDetail(user: User) {
    console.log('User\'s First Name ::', user.firstName);
    console.log('User\'s Last Name ::', user.lastName);
    console.log('User\'s Email ::', user.email);
    console.log(`User is ${user.isActive ? 'active' : 'not active'}`);
  }

  logError(result: any, operation: string = 'operation', message?: string) {
    console.log(`Operation ${operation} failed with message ${message || ''}`);
    console.log('Expected result ::', result);
  }
}

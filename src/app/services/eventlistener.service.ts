import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class EventListenerService {

  $success = new Subject<User>()

  constructor() { }

  success(user: User) {
    this.$success.next(user)
  }
}

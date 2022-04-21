import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {EventListenerService} from "../../services/eventlistener.service";

@Component({
  selector: 'app-profile-workout-programs',
  templateUrl: './profile-workout-programs.component.html',
  styleUrls: ['./profile-workout-programs.component.css', '../../app.component.css']
})
export class ProfileWorkoutProgramsComponent{

  user: User | undefined

  constructor(private eventListenerService: EventListenerService) {
    this.eventListenerService.$success.subscribe((user) => this.user = user)
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {EventListenerService} from "../../services/eventlistener.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-profile-workout-programs',
  templateUrl: './profile-workout-programs.component.html',
  styleUrls: ['./profile-workout-programs.component.css', '../../app.component.css']
})
export class ProfileWorkoutProgramsComponent implements OnInit {

  user: User | undefined


  constructor(private eventListenerService: EventListenerService,
              private tokenService: TokenStorageService) {
    this.eventListenerService.$success.subscribe((user) => this.user = user)
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser()
  }


}

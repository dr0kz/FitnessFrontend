import {Component, Input, OnInit} from '@angular/core';
import {WorkoutProgram} from "../../models/WorkoutProgram";
import {User} from "../../models/User";
import {EventListenerService} from "../../services/eventlistener.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {WorkoutProgramService} from "../../services/workout-program.service";

@Component({
  selector: 'app-workout-program',
  templateUrl: './workout-program.component.html',
  styleUrls: ['./workout-program.component.css']
})
export class WorkoutProgramComponent implements OnInit {

  @Input() workoutProgram: WorkoutProgram | undefined
  @Input() myProfile: User | undefined
  @Input() user: User | undefined

  constructor(private eventListenerService: EventListenerService,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private workoutProgramService: WorkoutProgramService) {
    this.eventListenerService.$success.subscribe((user) => this.user = user)
  }

  ngOnInit(): void {
  }

  deleteWorkoutProgram(workoutProgramId: number | undefined) {
    this.workoutProgramService.delete(workoutProgramId!)
      .subscribe(t => window.location.reload())
  }

}

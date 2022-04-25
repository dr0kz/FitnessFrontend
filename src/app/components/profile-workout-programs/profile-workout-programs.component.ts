import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {EventListenerService} from "../../services/eventlistener.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {filter, map, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {WorkoutProgram} from "../../models/WorkoutProgram";
import {WorkoutProgramService} from "../../services/workout-program.service";

@Component({
  selector: 'app-profile-workout-programs',
  templateUrl: './profile-workout-programs.component.html',
  styleUrls: ['./profile-workout-programs.component.css', '../../app.component.css']
})
export class ProfileWorkoutProgramsComponent implements OnInit {

  user: User | undefined
  workoutPrograms: WorkoutProgram[] | undefined
  myProfile: User | undefined
  selectedWorkoutProgram: WorkoutProgram | undefined

  constructor(private eventListenerService: EventListenerService,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private userService: UserService,
              private workoutProgramService: WorkoutProgramService) {
    this.eventListenerService.$success.subscribe((user) => this.user = user)
  }

  ngOnInit(): void {
    this.myProfile = this.tokenService.getUser()
    this.route.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => params.get('id')!),
      switchMap((id) => this.userService.findById(+id)),
      switchMap((user) => this.workoutProgramService.findAllByTrainer(user.id).pipe(
        map((workoutPrograms) => ({
          workoutPrograms: workoutPrograms,
          user: user,
        }))
      ))
    ).subscribe((data) => {
      this.user = data.user
      this.eventListenerService.success(data.user)
      this.workoutPrograms = data.workoutPrograms
      if (data.workoutPrograms.length != 0) {
        this.selectedWorkoutProgram = data.workoutPrograms[0]
      }
    })
  }
}

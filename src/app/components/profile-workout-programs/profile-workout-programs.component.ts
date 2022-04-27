import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {EventListenerService} from "../../services/eventlistener.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {filter, map, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {WorkoutProgram} from "../../models/WorkoutProgram";
import {WorkoutProgramService} from "../../services/workout-program.service";
import {Role} from "../../models/Role";
import {WorkoutProgramAndDay} from "../../models/WorkoutProgramAndDay";
import {BoughtWorkoutProgramService} from "../../services/bought-workout-program.service";

@Component({
  selector: 'app-profile-workout-programs',
  templateUrl: './profile-workout-programs.component.html',
  styleUrls: ['./profile-workout-programs.component.css', '../../app.component.css']
})
export class ProfileWorkoutProgramsComponent implements OnInit {

  user: User | undefined
  workoutPrograms: WorkoutProgramAndDay[] | undefined
  myProfile: User | undefined
  selectedWorkoutProgramAndDays: WorkoutProgramAndDay | undefined

  constructor(private eventListenerService: EventListenerService,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private userService: UserService,
              private boughtWorkoutProgramService: BoughtWorkoutProgramService,
              private workoutProgramService: WorkoutProgramService) {
    this.eventListenerService.$success.subscribe((user) => this.user = user)
  }

  ngOnInit(): void {
    this.myProfile = this.tokenService.getUser()
    this.route.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => params.get('id')!),
      switchMap((id) => this.userService.findById(+id)),
      switchMap((user) => this.workoutProgramService.findAllByUserId(user.id).pipe(
        map((data) => ({
          workoutProgramsAndDays: data.result,
          user: user,
        }))
      ))
    ).subscribe((data) => {
      this.user = data.user
      this.eventListenerService.success(data.user)
      this.workoutPrograms = data.workoutProgramsAndDays
      if (data.workoutProgramsAndDays.length != 0) {
        this.selectedWorkoutProgramAndDays = data.workoutProgramsAndDays[0]
      }
    })
  }

  onBuy(workoutProgramId: number) {
    this.boughtWorkoutProgramService.buy(workoutProgramId).subscribe(
      t => window.location.reload()
    )
  }

  onDelete(workoutProgramId: number) {
    this.workoutProgramService.delete(workoutProgramId).subscribe(
      t => window.location.reload()
    )
  }

}

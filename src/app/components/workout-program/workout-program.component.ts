import {Component, Input, OnInit} from '@angular/core';
import {WorkoutProgram} from "../../models/WorkoutProgram";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Role} from "../../models/Role";
import {BoughtWorkoutProgramService} from "../../services/bought-workout-program.service";
import {WorkoutProgramAndDay} from "../../models/WorkoutProgramAndDay";
import {Day} from "../../models/Day";

@Component({
  selector: 'app-workout-program',
  templateUrl: './workout-program.component.html',
  styleUrls: ['./workout-program.component.css', '../../app.component.css']
})
export class WorkoutProgramComponent implements OnInit {

  @Input() workoutProgramAndDays: WorkoutProgramAndDay | undefined
  @Input() user: User | undefined
  @Input() myProfile: User | undefined

  role: Role | undefined

  constructor(private userService: UserService,
              private boughtWorkoutProgramService: BoughtWorkoutProgramService) {
  }

  numSequence(n: Number) {
    return Array.from(Array(n).keys()).map(t => t + 1)
  }

  //We dont have time for this
  //The api should return Map<Int, List<Day>> ( week -> list of days )
  daysOfWeek(n: Number): Day[] | undefined {
    return this.workoutProgramAndDays?.days.filter(t => t.week == n)
  }

  ngOnInit(): void {
    this.userService.getRole().subscribe(data => this.role = data.result)
  }

  onBuy() {
    this.boughtWorkoutProgramService.buy(this.workoutProgramAndDays?.workoutProgram.id!!).subscribe()
  }

}

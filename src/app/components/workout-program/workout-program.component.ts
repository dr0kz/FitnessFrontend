import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Role} from "../../models/Role";
import {BoughtWorkoutProgramService} from "../../services/bought-workout-program.service";
import {WorkoutProgramAndDay} from "../../models/WorkoutProgramAndDay";
import {Day} from "../../models/Day";
import {DomSanitizer} from "@angular/platform-browser";

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
              private boughtWorkoutProgramService: BoughtWorkoutProgramService,
              private domSanitizer: DomSanitizer,) {
  }

  numSequence(n: Number) {
    return Array.from(Array(n).keys()).map(t => t + 1)
  }

  daysOfWeek(n: Number): Day[] | undefined {
    return this.workoutProgramAndDays?.days.filter(t => t.week == n)
  }

  transform(videoUrl: string){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  ngOnInit(): void {
    this.userService.getRole().subscribe(data => this.role = data.result)
  }

  onBuy() {
    this.boughtWorkoutProgramService.buy(this.workoutProgramAndDays?.workoutProgram.id!!).subscribe()
  }

}

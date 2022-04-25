import {Component, Input, OnInit} from '@angular/core';
import {WorkoutProgram} from "../../models/WorkoutProgram";

@Component({
  selector: 'app-workout-program',
  templateUrl: './workout-program.component.html',
  styleUrls: ['./workout-program.component.css']
})
export class WorkoutProgramComponent implements OnInit {

  @Input() workoutProgram: WorkoutProgram | undefined

  constructor() { }

  ngOnInit(): void {
  }

}

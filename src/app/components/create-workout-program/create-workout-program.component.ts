import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-workout-program',
  templateUrl: './create-workout-program.component.html',
  styleUrls: ['./create-workout-program.component.css', '../../app.component.css']
})
export class CreateWorkoutProgramComponent implements OnInit {

  numberOfWeeks: Number = 0
  constructor() { }

  ngOnInit(): void {
  }

  numSequence(n: Number){
    return Array.from(Array(n).keys()).map(t => t+1)
  }
}

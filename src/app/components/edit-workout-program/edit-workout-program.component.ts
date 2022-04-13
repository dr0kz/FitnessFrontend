import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-workout-program',
  templateUrl: './edit-workout-program.component.html',
  styleUrls: ['./edit-workout-program.component.css', '../../app.component.css']
})
export class EditWorkoutProgramComponent implements OnInit {

  numberOfWeeks: Number = 0
  constructor() { }

  ngOnInit(): void {
  }

  numSequence(n: Number){
    return Array.from(Array(n).keys()).map(t => t+1)
  }
}

import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {WorkoutProgramService} from "../../services/workout-program.service";

@Component({
  selector: 'app-create-workout-program',
  templateUrl: './create-workout-program.component.html',
  styleUrls: ['./create-workout-program.component.css', '../../app.component.css']
})
export class CreateWorkoutProgramComponent implements OnInit {

  numberOfWeeks: Number = 0
  createWorkoutProgramForm!: FormGroup
  //day!: FormGroup
  // days!: FormArray

  constructor(private workoutProgramService: WorkoutProgramService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.createWorkoutProgramForm = this.formBuilder.group({
      name: '',
      price: '',
      description: '',
      numberWeeks: '',
      dayTitle: [],
      dayDescription: [],
      dayVideo: [],
    });
  }

  numSequence(n: Number){
    return Array.from(Array(n).keys()).map(t => t+1)
  }

  onSubmit(): void {
    console.log(this.createWorkoutProgramForm.getRawValue())
    console.log("************************************")
    //this.createWorkoutProgramForm.value
    //this.createWorkoutProgramForm.patchValue()
    // let name = this.createWorkoutProgramForm.controls['name'].value
    // let price = this.createWorkoutProgramForm.controls['price'].value
    // let description = this.createWorkoutProgramForm.controls['description'].value
    // let numberWeeks = this.createWorkoutProgramForm.controls['numberWeeks'].value


  }
}

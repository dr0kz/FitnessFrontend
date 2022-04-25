import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {WorkoutProgramService} from "../../services/workout-program.service";

@Component({
  selector: 'app-create-workout-program',
  templateUrl: './create-workout-program.component.html',
  styleUrls: ['./create-workout-program.component.css', '../../app.component.css']
})
export class CreateWorkoutProgramComponent implements OnInit {

  numberOfWeeks: number = 0
  workoutProgramForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private workoutProgramService: WorkoutProgramService) {
  }

  ngOnInit(): void {
    this.workoutProgramForm = this.formBuilder.group({
        name: '',
        price: 0,
        description: '',
        days: this.formBuilder.array([])
      }
    );
  }

  get days(): FormArray {
    return this.workoutProgramForm.get("days") as FormArray;
  }

  numberOfWeeksChange(event: Event) {
    this.numberOfWeeks = +(event.target as HTMLInputElement).value;
    this.days.clear()

    for (let i = 0; i < this.numberOfWeeks * 7; i++) {
      const dayForm = this.formBuilder.group({
        title: '',
        description: '',
        video: ''
      })
      this.days.push(dayForm)
    }
  }

  numSequence(n: Number) {
    return Array.from(Array(n).keys()).map(t => t + 1)
  }


  onSubmit(): void {
    if (this.workoutProgramForm.invalid) {
      return;
    }
    let name = this.workoutProgramForm.controls['name'].value;
    let price = this.workoutProgramForm.controls['price'].value;
    let description = this.workoutProgramForm.controls['description'].value;
    let days = this.workoutProgramForm.controls['days'].value;

    this.workoutProgramService.create(name, price, description, days)
      .subscribe(t => console.log(t))
  }
}

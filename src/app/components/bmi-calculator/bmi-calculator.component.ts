import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent implements OnInit {

  calculateBmiForm!: FormGroup
  bmiIndex!: number
  bmiMeaning!: string
  flag: Boolean | undefined = undefined

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.calculateBmiForm = this.formBuilder.group({
      weight: '',
      height: '',
    });
  }

  onSubmit() {
    this.flag = false
    if (this.calculateBmiForm.invalid) {
      return;
    } else {
      let w = this.calculateBmiForm.get('weight')!!.value
      let h = this.calculateBmiForm.get('height')!!.value
      if(typeof w == "number" && typeof h == "number" && w>0 && h>0) {
        this.flag = false
        this.bmiIndex = Math.round((this.calculateBmiIndex(w,h) + Number.EPSILON) * 100) / 100
        this.bmiMeaning = this.calculateBmiMeaning(this.bmiIndex)
      } else {
        this.flag = true
        return;
      }
    }
  }

  calculateBmiIndex(w: number, h: number): number{
    return ((w/(h*h)) * 10000)
  }

  calculateBmiMeaning(n: number): string{
    if (n>24)
      return "Overweight"
    else if (n >= 19 && n <= 24)
      return "Normal weight"
    else if (n > 0 && n < 19)
      return "Underweight"
    else
      return "Undefined"
  }

}

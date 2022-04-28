import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../app.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    let name = this.registerForm.controls['name'].value;
    let surname = this.registerForm.controls['surname'].value;
    let email = this.registerForm.controls['email'].value;
    let password = this.registerForm.controls['password'].value;
    let confirmPassword = this.registerForm.controls['confirmPassword'].value;
    let role = this.registerForm.controls['role'].value;

    this.authService.register(name, surname, email, password, confirmPassword, role)
      .subscribe({
        next: user => {
          this.router.navigate(['/login'])
        },
        error: () => {
          console.log('error')
        }
      })
  }
}

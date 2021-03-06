import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenStorageService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;

    this.authService.login(email, password)
      .subscribe({
        next: user => {
          console.log(user)
          if (user.image != null) {
            user.image = 'data:image/png;base64,' + user.image
          }
          this.tokenService.saveToken(user.token)
          this.tokenService.saveUser(user)
          this.router.navigate(['/'])
        },
        error: (e) => {
          this.snackBar.open(e.error, 'X', {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 3000,
          });
        }
      })
  }

}

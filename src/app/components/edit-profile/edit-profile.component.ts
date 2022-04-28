import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css', '../../app.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfile!: FormGroup
  user: User | undefined

  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private router: Router,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser()
    this.editProfile = this.formBuilder.group({
      name: null,
      surname: null,
      email: null,
      password: null,
      confirmPassword: null,
      description: null,
      image: null,
    });
  }

  onSubmit(): void {
    if (this.editProfile.invalid) {
      return;
    }

    let formData = new FormData();

    if (this.editProfile.controls['name'].value != null) {
      formData.append("name", this.editProfile.controls['name'].value)
    }
    if (this.editProfile.controls['surname'].value != null) {
      formData.append("surname", this.editProfile.controls['surname'].value)
    }
    if (this.editProfile.controls['password'].value != null) {
      formData.append("password", this.editProfile.controls['password'].value)
    }
    if (this.editProfile.controls['confirmPassword'].value != null) {
      formData.append("confirmPassword", this.editProfile.controls['confirmPassword'].value)
    }
    if (this.editProfile.controls['email'].value != null) {
      formData.append("email", this.editProfile.controls['email'].value)
    }
    if (this.editProfile.controls['description'].value != null) {
      formData.append("description", this.editProfile.controls['description'].value)
    }
    formData.append("image", this.editProfile.get('image')!!.value)

    this.userService.editProfile(formData)
      .subscribe({
        next: profile => {
          profile.result.token = this.tokenService.getToken()!
          if (profile.result.image != null) {
            profile.result.image = 'data:image/png;base64,' + profile.result.image;
          }
          this.tokenService.saveUser(profile.result)
          this.user = this.tokenService.getUser()
          this.editProfile.reset()
        },
        error: () => {
          console.log('error updating profile')
        }
      })
  }

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList != null && fileList.length > 0) {
      const file = fileList[0];
      this.editProfile.get('image')!!.setValue(file);
    }
  }

}

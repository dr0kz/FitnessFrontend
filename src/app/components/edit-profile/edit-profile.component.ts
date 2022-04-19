import { Component, OnInit } from '@angular/core';
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
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.user = this.tokenService.getUser()

    this.editProfile = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      description: '',
      image: '',
    });

    this.user = this.tokenService.getUser()
  }

  onSubmit(): void {
    if (this.editProfile.invalid) {
      return;
    }

    let formData = new FormData();
    formData.append("name", this.editProfile.controls['name'].value)
    formData.append("surname", this.editProfile.controls['surname'].value)
    formData.append("email", this.editProfile.controls['email'].value)
    formData.append("password", this.editProfile.controls['password'].value)
    formData.append("confirmPassword", this.editProfile.controls['confirmPassword'].value)
    formData.append("description", this.editProfile.controls['description'].value)
    formData.append("image", this.editProfile.get('image')!!.value)

    this.userService.editProfile(formData)
      .subscribe({
        next: profile => {
          this.tokenService.saveUser(profile.response)
          this.router.navigate(['/profile/posts'])
        },
        error: () => {
          console.log('error updating profile')
        }
      })

    this.user = this.tokenService.getUser()
  }

  onFileChange(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList!=null && fileList.length > 0){
      const file =fileList[0];
      this.editProfile.get('image')!!.setValue(file);
    }
  }

}

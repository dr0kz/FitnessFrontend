import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css', '../../app.component.css']
})
export class CreatePostComponent implements OnInit{

  createPostForm!: FormGroup
  constructor(private postService: PostService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      description: '',
      image: '',
    });
  }
  onFileChange(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList!=null && fileList.length > 0){
      const file =fileList[0];
      this.createPostForm.get('image')!!.setValue(file);
    }
  }
  onSubmit(): void {
    if (this.createPostForm.invalid) {
      return;
    }
    let formData = new FormData();
    formData.append("image", this.createPostForm.get('image')!!.value)
    formData.append("description", this.createPostForm.controls['description'].value)

    this.postService.createPost(formData)
      .subscribe({
        next: post => {
          this.router.navigate(['/'])
        },
        error: () => {
          console.log('error')
        }
      })
  }
}

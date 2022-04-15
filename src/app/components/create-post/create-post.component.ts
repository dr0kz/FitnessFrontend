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
  onSubmit(): void {
    if (this.createPostForm.invalid) {
      return;
    }
    let description = this.createPostForm.controls['description'].value;
    let image = this.createPostForm.controls['image'].value;

    this.postService.createPost(description, image)
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

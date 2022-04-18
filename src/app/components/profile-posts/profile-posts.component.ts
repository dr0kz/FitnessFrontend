import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {map} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css', '../../app.component.css']
})
export class ProfilePostsComponent implements OnInit {

  posts: Post[] | undefined

  constructor(private postService: PostService,
              private sanitizer: DomSanitizer,) {
  }

  ngOnInit(): void {
    this.postService.getPostsByUser()
      .pipe(
        map((data) => this.postService.transformPost(data)))
      .subscribe({
        next: data => {
          this.posts = data
        },
        error: () => {
          console.log("error")
        }
      })
  }
}

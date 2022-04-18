import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../../app.component.css']
})
export class PostComponent {

  @Input() post: Post | null = null

  constructor(private postService: PostService) {
  }

  likeOrDislikePost(postId: number) {
    if (this.post != null) {
      this.post.muscles = this.post.likedBy ? this.post.muscles - 1 : this.post.muscles + 1;
      this.post.likedBy = !this.post.likedBy
    }
    this.postService.likeOrDislikePost(postId).subscribe()
  }

}

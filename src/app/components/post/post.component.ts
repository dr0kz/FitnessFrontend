import {Component, Input} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../../app.component.css']
})
export class PostComponent{

  @Input() post: Post | undefined
  @Input() user: User | undefined
  @Input() myProfile: User | undefined

  constructor(private postService: PostService) {
  }

  likeOrDislikePost(postId: number) {
    if (this.post != null) {
      this.post.muscles = this.post.likedBy ? this.post.muscles - 1 : this.post.muscles + 1;
      this.post.likedBy = !this.post.likedBy
    }
    this.postService.likeOrDislikePost(postId).subscribe()
  }

  deletePost(postId: number | undefined) {
    if (this.post != null && postId != undefined){
      this.postService.deletePost(postId).subscribe(
        t => window.location.reload()
      )
    }
  }

  starsByUser() {
    let n
    if (this.user!.followersNum >= 5) n = 5
    else if (this.user!.followersNum >= 4 && this.user!.followersNum < 5) n = 4
    else if (this.user!.followersNum >= 3 && this.user!.followersNum < 4) n = 3
    else if (this.user!.followersNum >= 2 && this.user!.followersNum < 3) n = 2
    else if (this.user!.followersNum >= 1 && this.user!.followersNum < 2) n = 1
    else n = 0
    return Array.from(Array(n).keys()).map(t => t + 1)
  }

}


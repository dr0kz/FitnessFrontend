import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {User} from "../../models/User";
import {EventListenerService} from "../../services/eventlistener.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {WorkoutProgramService} from "../../services/workout-program.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../../app.component.css']
})
export class PostComponent{

  @Input() post: Post | undefined
  @Input() user: User | undefined
  @Input() myProfile: User | undefined

  constructor(private postService: PostService,
    private eventListenerService: EventListenerService,
    private tokenService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private workoutProgramService: WorkoutProgramService) {
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
    if (this.post!.user!.followersNum >= 100000) n = 5
    else if (this.post!.user!.followersNum >= 10000 && this.post!.user!.followersNum < 100000) n = 4
    else if (this.post!.user!.followersNum >= 1000 && this.post!.user!.followersNum < 10000) n = 3
    else if (this.post!.user!.followersNum >= 100 && this.post!.user!.followersNum < 1000) n = 2
    else if (this.post!.user!.followersNum >= 10 && this.post!.user!.followersNum < 100) n = 1
    else n = 0
    console.log("dasdasdasd")
    return Array.from(Array(n).keys()).map(t => t + 1)
  }

}


import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {catchError, filter, map, of, switchMap} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {EventListenerService} from "../../services/eventlistener.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css', '../../app.component.css']
})
export class ProfilePostsComponent implements OnInit {

  posts: Post[] | undefined

  constructor(private postService: PostService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private eventListenerService: EventListenerService,
              private userService: UserService,) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter(t => t.has('id')),
      map(t => t.get('id')!),
      switchMap((id) => this.postService.getPostsByUserId(+id).pipe(
        map(t => ({id: id, posts: this.postService.transformPost(t)})),
      )),
      switchMap((data) => this.userService.findById(+data.id).pipe(
        map(t => ({
          posts: data.posts, user: {
            id:t.id,
            name: t.name,
            surname: t.surname,
            image: 'data:image/png;base64,'+t.image,
            description: t.description
          } as User
        }))
      ))
    ).subscribe((data) => {
      this.posts = data.posts
      this.eventListenerService.success(data.user)
    })

  }
}

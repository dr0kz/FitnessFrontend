import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {catchError, filter, map, of, switchMap} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css', '../../app.component.css']
})
export class ProfilePostsComponent implements OnInit {

  posts: Post[] | undefined

  constructor(private postService: PostService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter(t => t.has('id')),
      map(t => t.get('id')!),
      switchMap((id) => this.postService.getPostsByUserId(+id).pipe(
        map(t => this.postService.transformPost(t)),
      ))
    ).subscribe((data) => {
      this.posts = data
    })

  }
}

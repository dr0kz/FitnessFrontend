import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import {EventListenerService} from "../../services/eventlistener.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css', '../../app.component.css']
})
export class NewsFeedComponent implements OnInit {

  posts: Post[] | undefined;
  currentPage = 0;
  pageSize = 4;
  throttle = 1000;
  firstGetRequestDateTime: String | null = null;

  constructor(private postService: PostService,
              private sanitizer: DomSanitizer,
              private datePipe: DatePipe,
              private eventListenerService: EventListenerService,
              private tokenService: TokenStorageService,
              private userService: UserService,) {
  }

  fetchPosts(page: number, pageSize: number): void {

    if (this.firstGetRequestDateTime === null) {
      this.firstGetRequestDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }

    this.userService.getUser().subscribe(data => this.eventListenerService.success(data))

    this.postService.getPostsPaginate(page, pageSize, this.firstGetRequestDateTime!!)
      .subscribe({
        next: data => {
          if (this.posts === undefined) {
            this.posts = data
          } else {
            this.posts = [...this.posts, ...data]
          }
        },
        error: () => {
          console.log("error")
        }
      })
  }

  ngOnInit(): void {
    this.fetchPosts(0, this.pageSize);
  }

  onScrollDown() {
    this.fetchPosts(++this.currentPage, this.pageSize);
  }

}

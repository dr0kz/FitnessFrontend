import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {DomSanitizer} from "@angular/platform-browser";
import {map} from "rxjs";
import {DatePipe} from "@angular/common";

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
              private datePipe: DatePipe,) {
  }

  formatAndCalculateDifferenceBetweenTwoDates(date1: Date, date2: Date): string {
    let differenceInSeconds = (date1.getTime() - date2.getTime()) / 1000;
    if (differenceInSeconds >= 60) {
      let differenceInMinutes = differenceInSeconds / 60;
      if (differenceInMinutes >= 60) {
        let differenceInHours = differenceInMinutes / 60;
        if (differenceInHours >= 24) {
          return Math.floor(differenceInHours / 24) == 1 ? Math.floor(differenceInHours / 24) + ' day' : Math.floor(differenceInHours / 24) + ' days'
        }
        return Math.floor(differenceInHours) == 1 ? Math.floor(differenceInHours) + ' hour' : Math.floor(differenceInHours) + ' hours'
      }
      return Math.floor(differenceInMinutes) == 1 ? Math.floor(differenceInMinutes) + ' minute' : Math.floor(differenceInMinutes) + ' minutes'
    }
    return Math.floor(differenceInSeconds) == 1 ? Math.floor(differenceInSeconds) + ' second' : Math.floor(differenceInSeconds) + ' seconds'
  }

  fetchPosts(page: number, pageSize: number): void {
    if (this.firstGetRequestDateTime === null) {
      this.firstGetRequestDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }
    this.postService.getPostsPaginate(page, pageSize, this.firstGetRequestDateTime!!)
      .pipe(
        map((data) =>
          data.map(t => {
            let objectURL = 'data:image/png;base64,' + t.image;
            let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            return {
              id: t.id,
              muscles: t.muscles,
              dateCreated: t.dateCreated,
              createdBefore: this.formatAndCalculateDifferenceBetweenTwoDates(new Date(), new Date(t.dateCreated)),
              description: t.description,
              image: image,
              user: t.user,
              likedBy: t.likedBy,
            } as Post
          })
        ))
      .subscribe({
        next: data => {
          if (this.posts === undefined) {
            this.posts = data
          } else {
            this.posts = [...this.posts, ...data]
          }
        },
        error: () => {
          console.log("epicentar")
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

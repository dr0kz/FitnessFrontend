import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {DomSanitizer} from "@angular/platform-browser";
import {fromEvent, map, mergeMap, of, Subject, takeUntil} from "rxjs";
import {Event} from "@angular/router";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css', '../../app.component.css']
})
export class NewsFeedComponent implements OnInit {

  posts: Post[] | null = null

  constructor(private postService: PostService,
              private sanitizer: DomSanitizer,) {

  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: EventListener) {
  console.log(event)
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

  ngOnInit(): void {
    this.postService.getPostsPaginate(0, 10)
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
              user: t.user
            } as Post
          })
        ))
      .subscribe({
        next: data => {
          this.posts = data
        },
        error: () => {
          console.log("epicentar")
        }
      })
  }

}

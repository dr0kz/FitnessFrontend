import {Injectable} from '@angular/core';
import {Post} from "../../models/Post";

@Injectable({
  providedIn: 'root'
})
export class PostMapper {

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

  transformPosts(posts: Post[]): Post[] {
    return posts.map(post => this.transformPost(post))
  }

  transformPost(post: Post): Post {
    let postImage = 'data:image/png;base64,' + post.image;
    let userImage = post.user.image == null ? null : 'data:image/png;base64,' + post.user.image;

    return {
      id: post.id,
      muscles: post.muscles,
      dateCreated: post.dateCreated,
      createdBefore: this.formatAndCalculateDifferenceBetweenTwoDates(new Date(), new Date(post.dateCreated)),
      description: post.description,
      image: postImage,
      user: {
        id: post.user.id,
        name: post.user.name,
        surname: post.user.surname,
        image: userImage,
      },
      likedBy: post.likedBy,
    } as Post
  }

}

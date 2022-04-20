import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/Post";
import {Response} from "../models/Response";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,) {
  }

  getPostsPaginate(page: number, size: number, firstGetRequestDateTime: String): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts?page=${page}&pageSize=${size}&firstGetRequestDateTime=${firstGetRequestDateTime}`);
  }

  getPostsByUser(): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts/find-all-by-user`);
  }

  getPostsByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts/find-all-by-user/${id}`,);
  }

  createPost(formData: FormData): Observable<Response<any>> {
    return this.http.post<Response<any>>('/api/posts/add', formData);
  }

  deletePost(postId: number) {
    return this.http.delete(`/api/posts/${postId}`);
  }

  likeOrDislikePost(postId: number) {
    return this.http.put(`/api/users/muscle/${postId}`, {});
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


  transformPost(posts: Post[]): Post[] {
    return posts.map(t => {
      let postImage = 'data:image/png;base64,' + t.image;

      let userImage = t.user.image==null ? null :  'data:image/png;base64,' + t.user.image;
      return {
        id: t.id,
        muscles: t.muscles,
        dateCreated: t.dateCreated,
        createdBefore: this.formatAndCalculateDifferenceBetweenTwoDates(new Date(), new Date(t.dateCreated)),
        description: t.description,
        image: postImage,
        user: {
          id: t.user.id,
          name: t.user.name,
          surname: t.user.surname,
          image: userImage,
        },
        likedBy: t.likedBy,
      } as Post
    })
  }

}

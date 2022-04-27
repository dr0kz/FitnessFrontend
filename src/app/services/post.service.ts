import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "../models/Post";
import {Response} from "../models/Response";
import {DomSanitizer} from "@angular/platform-browser";
import {PostMapper} from "./PostMapper/PostMapper";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient,
              private postMapper: PostMapper,) {
  }

  getPostsPaginate(page: number, size: number, firstGetRequestDateTime: String): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts?page=${page}&pageSize=${size}&firstGetRequestDateTime=${firstGetRequestDateTime}`)
      .pipe(
        map((data) => this.postMapper.transformPosts(data))
      )
  }

  getPostsByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts/find-all-by-user/${id}`)
      .pipe(
        map((data) => this.postMapper.transformPosts(data))
      )
  }

  createPost(formData: FormData): Observable<Response<any>> {
    return this.http.post<Response<any>>('/api/posts/add', formData);
  }

  deletePost(postId: number) {
    return this.http.delete(`/api/posts/delete/${postId}`);
  }

  likeOrDislikePost(postId: number) {
    return this.http.put(`/api/users/muscle/${postId}`, {});
  }

}

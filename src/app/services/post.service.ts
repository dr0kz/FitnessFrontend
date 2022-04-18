import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/Post";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getPostsPaginate(page: number, size: number, firstGetRequestDateTime: String): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts?page=${page}&pageSize=${size}&firstGetRequestDateTime=${firstGetRequestDateTime}`);
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`/api/posts/${userId}`);
  }

  createPost(formData: FormData): Observable<Response<any>> {
    return this.http.post<Response<any>>('/api/posts/add', formData);
  }

  deletePost(postId: number) {
    return this.http.delete(`/api/posts/${postId}`);
  }

  likeOrDislikePost(postId: number) {
    return this.http.put(`/api/posts/likeOrDislike/${postId}`, {});
  }

  //update na post kako sto zborevme nema da ima tuku samo delete ke imame? ako ima togas ke se napravi plus view na frontend da se stavi

  //za like i dislike ima posebni 2 funkcie i 2 rute u kontroler
  //ja vikam da napravimo edna ruta ss ednu funkciju i pri klik ke se prakja put request
  //kd ke stigne put request ke se proveri dali u tabelata user_like_posts ima zapis so takvo user_id i takvo post_id
  //ako ima zapis ke se vrati true i ke se napravi dislike i broj na lajkovi na taa slika ke se namali +1

  //taka ke zabranime eden ist user povekje pati da lajkne eden ist post

}

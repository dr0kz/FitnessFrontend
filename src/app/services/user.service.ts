import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {Response} from "../models/Response";
import {User} from "../models/User";
import {UserProjection} from "../models/projections/UserProjection";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,) {
  }
  findAllBySearchText(searchText: string): Observable<UserProjection[]> {
    return this.http.get<User[]>(`/api/users/find-all-by-search-text?searchText=${searchText}`);
  }

  editProfile(formData: FormData): Observable<Response<User>> {
    return this.http.put<Response<any>>('/api/users/edit-profile', formData);
  }

  followUnfollowUser(followerId: number){
    return this.http.put(`/api/users/follow?userFollowerId=${followerId}`,{});
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`)
  }

}

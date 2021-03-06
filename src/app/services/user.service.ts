import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {map, Observable, tap} from "rxjs";
import {Response} from "../models/Response";
import {User} from "../models/User";
import {UserProjection} from "../models/projections/UserProjection";
import {UserMapper} from "./userMapper/UserMapper";
import {Role} from "../models/Role";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private userMapper: UserMapper,) {
  }

  findAllBySearchText(searchText: string): Observable<UserProjection[]> {
    return this.http.get<User[]>(`/api/users/find-all-by-search-text?searchText=${searchText}`)
      .pipe(
        map((users) => this.userMapper.transformUsers(users))
      )
  }

  editProfile(formData: FormData): Observable<Response<User>> {
    return this.http.put<Response<any>>('/api/users/edit-profile', formData);
  }

  getUser(): Observable<User> {
    return this.http.get<Response<User>>(`/api/users/get`)
      .pipe(map(t => this.userMapper.transformUser(t.result)))
  }

  followUnfollowUser(followerId: number) {
    return this.http.put(`/api/users/follow?userFollowerId=${followerId}`, {});
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`).pipe(
      map(user => this.userMapper.transformUser(user)),
    )
  }

  getRole(): Observable<Response<Role>> {
    return this.http.get<Response<Role>>('/api/users/role')
  }

}

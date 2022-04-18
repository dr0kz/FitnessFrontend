import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/Post";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) {
  }

  findAllBySearchText(searchText: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/find-all-by-search-text?searchText=${searchText}`);
  }
}

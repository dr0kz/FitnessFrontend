import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {Response} from "../models/Response";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,) {
  }
  findAllBySearchText(searchText: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/find-all-by-search-text?searchText=${searchText}`);
  }

  editProfile(formData: FormData): Observable<Response<User>> {
    return this.http.put<Response<any>>('/api/users/edit-profile', formData);
  }

}

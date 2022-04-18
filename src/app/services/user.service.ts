import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer,) {
  }

  editProfile(formData: FormData): Observable<Response<any>> {
    return this.http.put<Response<any>>('/api/users/edit-profile', formData);
  }

}

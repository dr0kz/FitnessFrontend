import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/auth/login', {
      email: email,
      password: password
    });
  }

  register(name: string, surname: string, email: string, password: string, confirmPassword: string, role: string): Observable<Response<string>> {
    return this.http.post<Response<string>>('/api/auth/register', {
      name: name,
      surname: surname,
      email: email,
      role: role,
      password: password,
      confirmPassword: confirmPassword,
    });
  }
}

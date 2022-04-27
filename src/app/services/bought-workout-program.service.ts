import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Response} from "../models/Response";
import {WorkoutProgram} from "../models/WorkoutProgram";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BoughtWorkoutProgramService {

  constructor(private http: HttpClient) { }

  buy(workoutProgramId: number): Observable<Response<string>>{
    return this.http.post<Response<string>>(`/api/bought-programs/buy/${workoutProgramId}`,{});
  }

  list(): Observable<Response<WorkoutProgram[]>>{
    return this.http.get<Response<WorkoutProgram[]>>(`/api/bought-programs/list`);
  }

}

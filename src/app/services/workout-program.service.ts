import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkoutProgram} from "../models/WorkoutProgram";
import {User} from "../models/User";
import {WorkoutProgramProjection} from "../models/projections/WorkoutProgramProjection";
import {Response} from "../models/Response";

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramService {

  constructor(private http: HttpClient) { }

  findAllByTrainer(trainerId: number): Observable<WorkoutProgram[]>{
    return this.http.get<WorkoutProgram[]>(`/api/workout-program/list/${trainerId}`);
  }

  // findAllBought():Observable<WorkoutProgramProjection[]>{
  //
  // }

  findById(workoutProgramId: number): Observable<Response<WorkoutProgram>> {
    return this.http.get<Response<WorkoutProgram>>(`/api/workout-program/${workoutProgramId}`);
  }

  buy(workoutProgramId: number): Observable<Response<any>> {
    return this.http.put<Response<any>>(`/api/workout-program/${workoutProgramId}`,{})
  }

  delete(workoutProgramId: number): Observable<Response<any>> {
    return this.http.delete<Response<any>>(`/api/workout-program/delete/${workoutProgramId}`)
  }

  create(name: string, price:number, description: string, days: []): Observable<Response<string>> {
    return this.http.post<Response<string>>('/api/workout-program/create', {
      name: name,
      description: description,
      price: price,
      days: days
    });
  }
  //create()

}

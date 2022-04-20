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

  findAllByTrainer(trainerId: number): Observable<WorkoutProgramProjection[]>{
    return this.http.get<WorkoutProgramProjection[]>(`/api/workout-program/list/${trainerId}`);
  }

  findById(workoutProgramId: number): Observable<Response<WorkoutProgram>> {
    return this.http.get<Response<any>>(`/api/workout-program/${workoutProgramId}`);
  }


}

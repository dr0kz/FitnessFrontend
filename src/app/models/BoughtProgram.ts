import {User} from "./User";
import {WorkoutProgram} from "./WorkoutProgram";

export interface BoughtProgram {
  id: number,
  workoutProgram: WorkoutProgram, //the actual workout program that is bought by the same user below
  user: User  //user who bought the workout program
}

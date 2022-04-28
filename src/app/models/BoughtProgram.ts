import {User} from "./User";
import {WorkoutProgram} from "./WorkoutProgram";

export interface BoughtProgram {
  id: number,
  workoutProgram: WorkoutProgram,
  user: User
}

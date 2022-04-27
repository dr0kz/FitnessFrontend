import {WorkoutProgram} from "./WorkoutProgram";
import {Day} from "./Day";

export interface WorkoutProgramAndDay {
  workoutProgram: WorkoutProgram,
  days: Day[],
}

import {DayOfWeek} from "./DayOfWeek";
import {WorkoutProgram} from "./WorkoutProgram";

export interface Day {
  id: number,
  dayOfWeek: DayOfWeek,
  title: string,
  description: string,
  video: string,
  week: number,
  workoutProgram: WorkoutProgram //the workout program on which this day belongs
}

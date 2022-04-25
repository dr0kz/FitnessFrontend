import {User} from "./User";

export interface WorkoutProgram {
  id: number,
  name: string,
  price: number,
  description: string,
  days: {
    title: string,
    description: string,
    video: string,
  }
}

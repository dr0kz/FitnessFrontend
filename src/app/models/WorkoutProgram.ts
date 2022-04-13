import {User} from "./User";

export interface WorkoutProgram {
  id: number,
  name: string,
  price: number,
  description: string,
  user: User  //trainer who created the workout program
}

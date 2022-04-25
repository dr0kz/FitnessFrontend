import {User} from "./User";

export interface WorkoutProgram {
  id: number,
  name: string,
  price: number,
  description: string,
  userTrainer: {
    id: number,
    name: string,
    surname: string,
  },
}

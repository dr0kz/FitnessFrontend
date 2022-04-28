import {User} from "./User";

export interface Post {
  id: number,
  muscles: number,
  dateCreated: Date,
  createdBefore: string,
  description: string,
  image: string,
  user: User,
  likedBy: boolean,
}

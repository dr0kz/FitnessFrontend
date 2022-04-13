import {User} from "./User";

export interface Post {
  id: number,
  muscles: number,
  dateCreated: Date, // na backend e LocalDateTime dali e okej ovoj?
  description: string,
  image: string,
  user: User  //user who created the post
}

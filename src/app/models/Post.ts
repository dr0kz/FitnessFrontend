import {User} from "./User";
import {Byte} from "@angular/compiler/src/util";

export interface Post {
  id: number,
  muscles: number,
  dateCreated: Date, // na backend e LocalDateTime dali e okej ovoj?
  createdBefore: string,
  description: string,
  image: string,
  user: User,  //user who created the post
  likedBy: boolean,
}

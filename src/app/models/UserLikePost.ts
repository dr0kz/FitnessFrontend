import {User} from "./User";
import {Post} from "./Post";

export interface UserLikePost {
  id: number,
  post: Post,
  user: User
}

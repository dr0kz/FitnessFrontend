import {User} from "./User";
import {Post} from "./Post";

export interface UserLikePost {
  id: number,
  post: Post, //the post that has been liked
  user: User  //user who liked the post
}

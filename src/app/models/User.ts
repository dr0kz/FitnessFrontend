import {Role} from "./Role";

export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  image: string,
  description: string,
  role: string,
  token: string,
  followersNum: number,
  followingNum: number,
  followedBy: boolean
}

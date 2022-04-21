import {Injectable} from '@angular/core';
import {User} from "../../models/User";
import {Post} from "../../models/Post";

@Injectable({
  providedIn: 'root'
})
export class UserMapper {

  constructor() {
  }

  transformUsers(users: User[]): User[] {
    return users.map(user => this.transformUser(user))
  }

  transformUser(user: User) {
    let userImage = user.image == null ? null : 'data:image/png;base64,' + user.image;

    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      image: userImage,
      description: user.description,
      role: user.role,
      token: user.token,
      followersNum: user.followersNum,
      followingNum: user.followingNum,
      followedBy: user.followedBy
    } as User
  }

}

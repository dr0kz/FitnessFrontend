import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-side-section',
  templateUrl: './side-section.component.html',
  styleUrls: ['./side-section.component.css']
})
export class SideSectionComponent implements OnInit {

  user: User | undefined
  followedUser: User | undefined

  constructor(private tokenService: TokenStorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser()
  }

  followOrUnfollowUser(followerId: number) {
    this.userService.findById(followerId).subscribe(
      {
        next: value => {
          this.followedUser = value
        },
        error: () => {
          console.log('error finding followed user')
        }
      }
    )
    if (this.user != null && this.followedUser != null) {
        this.user.followingNum = this.user.followedBy ? this.user.followingNum - 1 : this.user.followingNum + 1
        this.followedUser.followersNum = this.user.followedBy ? this.followedUser.followersNum -1 : this.followedUser.followersNum + 1
        this.user.followedBy = !this.user.followedBy
    }
    this.userService.followUnfollowUser(followerId).subscribe()
  }

}

import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user.service";
import {EventListenerService} from "../../services/eventlistener.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-side-section',
  templateUrl: './side-section.component.html',
  styleUrls: ['./side-section.component.css']
})
export class SideSectionComponent implements OnInit {

  user: User | undefined

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private eventListenerService: EventListenerService) {
    this.eventListenerService.$success.subscribe((user) => this.user = user)
  }

  ngOnInit(): void {
    this.userService.findById(this.tokenService.getUser()!!.id)
      .subscribe((user) => this.user = user)
  }

  followOrUnfollowUser(followerId: number) {
    this.userService.followUnfollowUser(followerId).pipe(
      switchMap(t => this.userService.findById(followerId))
    ).subscribe(
      {
        next: value => {
          if (this.user!!.followedBy) {
            this.user!!.followersNum--;
          } else {
            this.user!!.followersNum++;
          }
          this.user!!.followedBy = !this.user!!.followedBy
        },
        error: () => {
          console.log('error finding followed user')
        }
      }
    )

  }

  isDifferentUser() {
    return this.user?.id != this.tokenService.getUser()?.id
  }

  starsByUser() {
    let n
    if (this.user!.followersNum >= 100000) n = 5
    else if (this.user!.followersNum >= 10000 && this.user!.followersNum < 100000) n = 4
    else if (this.user!.followersNum >= 1000 && this.user!.followersNum < 10000) n = 3
    else if (this.user!.followersNum >= 100 && this.user!.followersNum < 1000) n = 2
    else if (this.user!.followersNum >= 10 && this.user!.followersNum < 100) n = 1
    else n = 0
    return Array.from(Array(n).keys()).map(t => t + 1)
  }

}

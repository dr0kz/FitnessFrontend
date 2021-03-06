import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {FormControl} from "@angular/forms";
import {debounce, distinctUntilChanged, filter, interval, map, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserProjection} from "../../models/projections/UserProjection";
import {User} from "../../models/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css'],
})
export class HeaderComponent implements OnInit {

  searchForm = new FormControl();
  users: UserProjection[] | undefined
  usersTemp: UserProjection[] | undefined
  currentUser: User | undefined
  myId: number | undefined
  mouseOverSearch = false

  constructor(private tokenService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.myId = this.tokenService.getUser()?.id

    this.currentUser = this.tokenService.getUser()

    this.searchForm.valueChanges.pipe(
      debounce(t => interval(390)),
      distinctUntilChanged(),
    ).subscribe({
      next: (searchText) => {
        this.router.navigate(
          [],
          {queryParams: {searchText: searchText}}
        );
      },
      error: () => {
        console.log('error')
      }
    })

    this.route.queryParamMap.pipe(
      filter(t => t.has('searchText')),
      map(t => t.get('searchText')!),
      switchMap((searchText) => this.userService.findAllBySearchText(searchText).pipe(
        map(users => ({
          searchText: searchText, users: users
        }))
      ))
    ).subscribe(({searchText, users}) => {
      this.searchForm.setValue(searchText)
      if (searchText.length === 0) {
        this.users = undefined
      } else {
        this.users = users
      }
    })
  }

  onMouseOverSearch() {
    this.mouseOverSearch = true;
  }

  onMouseLeaveSearch() {
    this.mouseOverSearch = false;
  }

  onFocus() {
    this.users = this.usersTemp?.map(e => ({...e}));
  }

  onOutOfFocus() {
    if (!this.mouseOverSearch) {
      this.usersTemp = this.users?.map(e => ({...e}));
      this.users = undefined
    }
  }

  onLogOut() {
    this.tokenService.signOut();
    window.location.href = '/login';
  }

}

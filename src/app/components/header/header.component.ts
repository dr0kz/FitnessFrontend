import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {FormControl} from "@angular/forms";
import {catchError, debounce, distinctUntilChanged, filter, interval, map, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserProjection} from "../../models/projections/UserProjection";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css'],
})
export class HeaderComponent implements OnInit {

  searchForm = new FormControl();
  users: UserProjection[] | undefined
  usersTemp: UserProjection[] | undefined
  errorMessage = ''

  constructor(private tokenService: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {

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
        catchError(() => {
          this.errorMessage = 'Error fetching data';
          return of([])
        }),
        map(k => ({searchText: searchText, users: k}))
      ))
    ).subscribe(({searchText, users}) => {
      if (searchText.length === 0) {
        this.users = undefined
      } else {
        this.users = users
      }
    })
  }

  onFocus() {
    this.users = this.usersTemp?.map(e => ({...e}));
  }

  onOutOfFocus() {
    this.usersTemp = this.users?.map(e => ({...e}));
    this.users = undefined
  }

  onLogOut() {
    this.tokenService.signOut();
    window.location.href = '/login';
  }
}

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
      switchMap((searchText) => {
        if(searchText.length===0){
          return of([])
        }
        return this.userService.findAllBySearchText(searchText).pipe(
          catchError(() => {
            this.errorMessage = 'Error fetching data';
            return of([])
          })
        )
      })
    ).subscribe((data) => {
      this.users = data
    })
  }

  onOutOfFocus(){
    this.users = undefined
  }

  onLogOut() {
    this.tokenService.signOut();
    window.location.href = '/login';
  }
}

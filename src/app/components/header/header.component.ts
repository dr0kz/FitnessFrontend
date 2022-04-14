import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../app.component.css'],
})
export class HeaderComponent {

  constructor(private tokenService: TokenStorageService) {
  }

  onLogOut() {
    this.tokenService.signOut();
    window.location.href='/login';
  }

}

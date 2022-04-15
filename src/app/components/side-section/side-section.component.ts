import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-side-section',
  templateUrl: './side-section.component.html',
  styleUrls: ['./side-section.component.css']
})
export class SideSectionComponent implements OnInit {

  user: User | undefined
  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenService.getUser()
  }

}

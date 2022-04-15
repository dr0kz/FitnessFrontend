import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post | null = null

  constructor() { }

  ngOnInit(): void {
  }

}

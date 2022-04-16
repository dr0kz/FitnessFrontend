import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/Post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css','../../app.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post | null = null

  constructor() { }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component'
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { SideSectionComponent } from './components/side-section/side-section.component';
import { PostComponent } from './components/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from "@angular/material/icon";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import { CreateWorkoutProgramComponent } from './components/create-workout-program/create-workout-program.component';
import {FormsModule} from "@angular/forms";
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    NewsFeedComponent,
    AuthenticatedComponent,
    SideSectionComponent,
    PostComponent,
    EditProfileComponent,
    CreateWorkoutProgramComponent,
    ProfilePostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

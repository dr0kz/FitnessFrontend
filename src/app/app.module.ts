import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {NewsFeedComponent} from './components/news-feed/news-feed.component'
import {AuthenticatedComponent} from './components/authenticated/authenticated.component';
import {SideSectionComponent} from './components/side-section/side-section.component';
import {PostComponent} from './components/post/post.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from "@angular/material/icon";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {CreateWorkoutProgramComponent} from './components/create-workout-program/create-workout-program.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfilePostsComponent} from './components/profile-posts/profile-posts.component';
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {
  ProfileWorkoutProgramsComponent
} from './components/profile-workout-programs/profile-workout-programs.component';
import {WorkoutProgramComponent} from './components/workout-program/workout-program.component';
import {EditWorkoutProgramComponent} from './components/edit-workout-program/edit-workout-program.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from './helpers/auth_interceptor'
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {DatePipe} from '@angular/common';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";

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
    ProfilePostsComponent,
    CreatePostComponent,
    ProfileWorkoutProgramsComponent,
    WorkoutProgramComponent,
    EditWorkoutProgramComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        BrowserAnimationsModule,
        MatSliderModule,
        MatIconModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
    ],
  providers: [DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

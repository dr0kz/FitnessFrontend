import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { LoginComponent } from './components/login/login.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { RegisterComponent } from './components/register/register.component';
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {CreateWorkoutProgramComponent} from "./components/create-workout-program/create-workout-program.component";
import {ProfilePostsComponent} from "./components/profile-posts/profile-posts.component";
import {ProfileWorkoutProgramsComponent} from "./components/profile-workout-programs/profile-workout-programs.component";
import {EditWorkoutProgramComponent} from "./components/edit-workout-program/edit-workout-program.component";
import {AuthGuard} from "./helpers/authguard";

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: NewsFeedComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'workout-programs/create', component: CreateWorkoutProgramComponent},
      { path: 'workout-programs/edit', component: EditWorkoutProgramComponent},
      { path: 'profile/:id/posts', component: ProfilePostsComponent},
      { path: 'profile/workout-programs', component: ProfileWorkoutProgramsComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

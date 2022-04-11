import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { LoginComponent } from './components/login/login.component';
import { NewsFeedComponent } from './components/news-feed/news-feed.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { 
    path: '',
    component: AuthenticatedComponent, 
    children: [
      { path: '', component: NewsFeedComponent },
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

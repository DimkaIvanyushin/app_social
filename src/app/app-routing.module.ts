import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ConfigComponent } from './components/profile/config/config.component';
import { SearchComponent } from './components/profile/search/search.component';
import { PostsComponent } from './components/profile/posts/posts.component';
import { MessagesComponent } from './components/profile/messages/messages.component';
import { CreateComponent } from './components/profile/create/create.component';

import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'config',
        component: ConfigComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
  // { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard] },
  // { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
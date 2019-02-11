import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.pug',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  signOut(){
    this.authService.signOut();
  }

  ngOnInit() {
  }

}

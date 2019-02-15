import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.pug',
  styleUrls: ['./sign-up.component.styl']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}

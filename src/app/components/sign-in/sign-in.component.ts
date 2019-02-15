import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.pug',
  styleUrls: ['./sign-in.component.styl']
})
export class SignInComponent implements OnInit {

  private _shown = false;
  private _loading = false;

  constructor(
    public authService: AuthService
  ) { }

  showPassword() {
    this._shown = !this._shown;
  }

  signIn(login: string, password: string) {
    this.authService.signIn(login, password);
  }

  ngOnInit() {
  }

}

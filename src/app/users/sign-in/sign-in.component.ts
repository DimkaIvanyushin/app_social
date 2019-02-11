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
  private _validation = true;

  constructor(
    public authService: AuthService
  ) { }

  showPassword() {
    this._shown = !this._shown;
  }

  login() {
    this._loading = !this._loading;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.pug',
  styleUrls: ['./config.component.styl']
})
export class ConfigComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}

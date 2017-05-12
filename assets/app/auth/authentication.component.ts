import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  template: `
    <header class="row spacing">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
          <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signup']">Signup</a></li> <!--I added ngIf to prevent signup form from coming up when user is already logged in -->
          <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
          <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
        </ul> <!-- [routerLink] is a built-in directive it needs a list of paths to route to, routerLinkActive belongs to routerLink directive and whatever is assigned to it will be added as the class of current html element -->
      </nav>
    </header>
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div>
  `
})

export class AuthenticationComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {}
}

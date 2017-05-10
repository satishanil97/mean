import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <header class="row">
    <nav class="col-md-8 col-md-offset-2">
      <ul class="nav nav-pills">
        <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenger</a></li>
        <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
      </ul> <!-- [routerLink] is a built-in directive it needs a list of paths to route to, routerLinkActive belongs to routerLink directive and whatever is assigned to it will be added as the class of current html element -->
    </nav>
  </header>
  `
})

export class HeaderComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}

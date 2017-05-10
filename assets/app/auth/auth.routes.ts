import { Routes, RouterModule } from "@angular/router"
import { SigninComponent } from "./signin.component"
import { SignupComponent } from "./signup.component"
import { LogoutComponent } from "./logout.component"


export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full'},  //not /sigup as it will take it to localhost:3000/sigin
  {path: 'signin', component: SigninComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'logout', component: LogoutComponent}
];

//no need of defining a new router module as one alredy exists in app.routing.ts
//we can set the current route as a child route of authin app.routing.ts

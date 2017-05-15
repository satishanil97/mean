import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { MessageModule } from './messages/message.module'
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { HttpModule } from "@angular/http";
import { AuthService } from './auth/auth.service'
import { ErrorComponent } from'./errors/error.component'
import { ErrorService } from './errors/error.service'

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent
    ],
    imports: [BrowserModule , routing, ReactiveFormsModule, HttpModule, MessageModule],
    providers: [AuthService,ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}

//we nedd to declare a message related component in app module only if we were to use one of its selectors and directly embed it in one of our component templates in app.component.html

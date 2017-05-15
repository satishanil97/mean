import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { MessageModule } from './messages/message.module'
import { HttpModule } from "@angular/http";
import { AuthService } from './auth/auth.service'
import { ErrorComponent } from'./errors/error.component'
import { ErrorService } from './errors/error.service'

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,  //we can remove MessageComponent from here, but not AuthenticationComponent as MessageModule is loaded first itself unlike AuthenticationComponent ,since AuthenticationComponentis a part of root routes, we need to include it here
        HeaderComponent,
        ErrorComponent
    ],
    imports: [BrowserModule , routing, HttpModule, MessageModule],
    providers: [AuthService,ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}

//we nedd to declare a message related component in app module only if we were to use one of its selectors and directly embed it in one of our component templates in app.component.html

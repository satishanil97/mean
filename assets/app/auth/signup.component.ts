import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators }from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    const user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
    this.authService.signUp(user).subscribe(result => console.log(result), error => console.error(error));
    this.myForm.reset();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()){  // --> I added this myself to prevent signup form from coming up when user is already logged in
      this.router.navigateByUrl('/auth/logout');
    }//my modification till here <--

    this.myForm = new FormGroup({
      firstName: new FormControl(null,Validators.required),
      lastName: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,Validators.required)
    });
  }
}

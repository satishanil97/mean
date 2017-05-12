import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators }from '@angular/forms';
import { User } from './user.model'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    const user = new User(this.myForm.value.email, this.myForm.value.password);
    this.authService.signIn(user)
    .subscribe(data => {
      localStorage.setItem('token',data.token);   //we can either choose to keep the tokens in localStorage or in cookies
      localStorage.setItem('userId',data.userId); //if we want the user to login again after closing browser (before expiry of token), use sessionStorage
      this.router.navigateByUrl('/'); //go to messages page after signing in
    },
    error => console.error(error)
  );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,Validators.required)
    });
  }
}

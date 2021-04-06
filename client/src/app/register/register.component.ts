import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validatingForm:any;
  faeye=faEye;

/**
   * Username Field
   */
 public username = '';

 /**
  * Password Field
  */
 public password = '';

 /**
  * Password Field
  */
 public confirmPassword = '';

 /**
  * Email Field
  */
 public email = '';

 /**
  * Visibility Boolean
  */
 public isVisible = false;

 /**
  * Visibility Boolean
  */
 public isConfirmationVisible = false;

 /**
  * message Error
  */
 public messageError="";


 /**
  * Email Regex
  */
 // tslint:disable-next-line:max-line-length
 public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 /**
  * App Constructor
  * @param { AuthService } auth - Auth HTTP Service
  * @param { Router } router - Angular Router
  */
 constructor(
   private router: Router
 ) {}

 /**
  * Initializer
  */
 ngOnInit() {
  this.validatingForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
 }

 /**
  * Register
  */
 public register(): void {
   const data = {
     'username'  : this.username,
     'email'     : this.email,
     'password'  : this.password,
   };

   
 }
  get input() { return this.validatingForm.get('email'); }


}

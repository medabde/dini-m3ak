import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validatingForm:any;
  faeye=faEye;

  showSuccess:boolean = false;

  public firstname='';
  public lastname ='';
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
   private router: Router, private auth :AuthService
 ) {    if(localStorage.getItem('profile'))this.router.navigate(['home']);
}

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
  register():void{
    this.auth.signUpClient(this.email,this.password,this.firstname,this.lastname).subscribe(data =>
    {
    this.firstname="";
    this.lastname="";
    this.email="";
    this.password="";
    this.confirmPassword="";

    this.showSuccess = true;
    setTimeout( () => {
      this.showSuccess = false;
    }, 7000);

  },error =>{this.messageError=error.error.message;});
   
  }

   
 
  get input() { return this.validatingForm.get('email'); }


}

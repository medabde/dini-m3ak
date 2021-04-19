import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {AuthService } from 'src/app/services/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faeye=faEye;
  user:any = {
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmPassword:''
  }
  
  public username = '';

  /**
   * Password Field
   */
  public password = '';

  /**
   * Visibility Boolean
   */
  public isVisible = false;

  /**
   * message Error
   */
  public messageError: any;

  /**
   * App Constructor
   * @param { AuthService } auth - Auth HTTP Service
   * @param { Router } router - Angular Router
   */
  constructor(
    private router: Router,private auth :AuthService
  ) {
    if(localStorage.getItem('profile'))this.router.navigate(['home']);

  }

  /**
   * Initializer
   */
  ngOnInit() {
   
  }

  /**
   * Make a login request
   */
  
  public login(): void {
    const data = {
      'username' : this.username,
      'password' : this.password,
    };
    if(this.username==''||this.password=='') this.messageError = "All fields are required";
    else{
      this.auth.signInClient(this.username,this.password).subscribe(data =>{this.messageError='';
      //
      const decodedToken:any = decode(JSON.parse(JSON.stringify(data)|| "").token);
      if(decodedToken.is_enabled == false){
        this.messageError="Please confirm your email to complete your registration"
      }
      else{
        localStorage.setItem('profile',JSON.stringify(data));
         this.router.navigate(['home']);
      }
     
      },error =>{this.messageError=error.error.message;});
    }
    console.log(this.username);
    console.log(this.password)
  }
}

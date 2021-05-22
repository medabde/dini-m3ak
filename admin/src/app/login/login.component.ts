import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService } from '../../app/services/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:any = {
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    confirmPassword:''
  }

  public email = '';

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

  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  /**
   * App Constructor
   * @param { AuthService } auth - Auth HTTP Service
   * @param { Router } router - Angular Router
   */
  constructor(
    private router: Router,private auth :AuthService
  ) {
    //if(localStorage.getItem('profile'))this.router.navigate(['home']);

  }

  /**
   * Initializer
   */
  ngOnInit() {
  console.log("init login")
  
  console.log(this.auth.isAcces())
   if(this.auth.isAcces()){
     this.router.navigateByUrl("/dashboard");
   }

  }

  onFocus(){
    this.messageError="";
  }

  /**
   * Make a login request
   */

  public login(): void {
    if(this.email==''||this.password=='') this.messageError = "Tous les champs sont requis";
    else{
      this.auth.signInClient(this.email,this.password).subscribe(data =>{this.messageError='';
      //
      const decodedToken:any = decode(JSON.parse(JSON.stringify(data)|| "").token);
      if(decodedToken.is_enabled == false){
        this.messageError="Veuillez confirmer votre email pour terminer votre inscription"
      }
      else{

         localStorage.setItem('profile',JSON.stringify(data));
         localStorage.setItem("isAcess",String(true));

         this.router.navigateByUrl("/dashboard");
      }

      },error =>{this.messageError="Email ou mot de passe erroné";});
    }
  }


}

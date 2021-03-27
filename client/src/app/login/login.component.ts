import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error : string ='';
  isSignIn:boolean;

  user:any = {
    nom:'',
    prenom:'',
    email:'',
    password:'',
    confirmPassword:''
  }

  constructor(private usersService:UserService,private router:Router) {
    if(localStorage.getItem('profile'))this.router.navigate(['users']);
    this.isSignIn = true;
   }

  ngOnInit(): void {
  }
  login():void{
    //this.usersService.signIn(this.user.email,this.user.password);
    if(this.user.email==''||this.user.password=='') this.error = "All fields are required";
    else{
      this.usersService.signIn(this.user.email,this.user.password).subscribe(data =>{this.error='';localStorage.setItem('profile',JSON.stringify(data));this.router.navigate(['list']);},error =>{this.error=error.error.message;});

    }
    
  }

}

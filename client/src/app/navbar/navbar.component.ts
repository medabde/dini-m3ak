import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import decode from 'jwt-decode';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  fauser=faUser;
  plus=faPlusCircle;
  car=faCar;
  name :string ='';
  constructor(private auth:AuthService, private router :Router) {
    if(!localStorage.getItem('profile'))this.router.navigate(['login']);
    
   const decodedToken:any = decode(JSON.parse(localStorage.getItem('profile')|| "").token);
   this.name = decodedToken.first_name+' '+decodedToken.last_name;

   if(decodedToken.exp * 1000 < new Date().getTime()) this.dec();
   }

  ngOnInit(): void {
  }
  dec():void{
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  navigateHome(){
    this.router.navigate(['home']);
  }

  navigateProfile(){
    this.router.navigate(['profile']);
  }

  navigateMyRides(){
    console.log("h")
    this.router.navigate(['ride']);
  }
  navigateAddRide(){
    this.router.navigate(['add-ride'])
  }

}

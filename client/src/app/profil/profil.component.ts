import { Component, OnInit } from '@angular/core';
import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {
  public userInfo = [];
  user:User = new User();
  toasts: any[] = [];

  /**
   * Settings Constructor
   *
   * @param { UsersService } users - Users HTTP Service
   * @param { Router } router - Angular Router
   */
  constructor(
    private router: Router,
    private userService:UserService
  ) {
    this.refreshProfile();
   }


 

  ngOnInit(): void {
  }

  refreshProfile(){
    const decodedToken:any = decode(JSON.parse(localStorage.getItem('profile')|| "").token);
    this.user.id_user = decodedToken.userId;
    this.user.first_name = decodedToken.first_name;
    this.user.last_name = decodedToken.last_name;
    this.user.address =decodedToken.address;
    this.user.email = decodedToken.email;
    this.user.cin = decodedToken.cin;
    this.user.phone = decodedToken.phone;
  }

  updateProfile(){
    this.userService.updateUser(this.user).subscribe(data =>{
      localStorage.setItem('profile',JSON.stringify(data));
      this.refreshProfile();
    });
  }

}

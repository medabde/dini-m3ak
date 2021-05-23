import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService} from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user.cmp',
  moduleId: module.id,
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(        
    private router: Router,
    private userService:UserService,
    private modalService: NgbModal,private toastrService: ToastrService) {
      this.refreshProfile();
     }

     public userInfo = [];
     user:User = new User();
     toasts: any[] = [];
     showSuccess:boolean = false;

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
  
         this.userService.updateProfile(this.user).subscribe(data =>{
           
        localStorage.setItem('profile',JSON.stringify(data));
        this.refreshProfile();
      });
          
    }

}

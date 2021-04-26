import { Component, OnInit } from '@angular/core';
import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService} from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Modification du profile
    </h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Etes-vous sûr que vous voulez modifier</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="no()">Annuler</button>
    <button type="button" class="btn btn-danger" (click)="yes()">Ok</button>
  </div>
  `
})
export class  NgbdModalConfirm {
  //@Input() name:any;
  //options: ConfirmOptions;
  constructor(public modal: NgbActiveModal) {}
  yes() {
    this.modal.close('confirmed');
  }

  no() {
    this.modal.dismiss('not confirmed');
  }
}
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {
  public userInfo = [];
  user:User = new User();
  toasts: any[] = [];
  showSuccess:boolean = false;

  /**
   * Settings Constructor
   *
   * @param { UsersService } users - Users HTTP Service
   * @param { Router } router - Angular Router
   */
  constructor(
    private router: Router,
    private userService:UserService,
    private modalService: NgbModal,private toastrService: ToastrService
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
    
    const modalRef = this.modalService.open(NgbdModalConfirm).result; 
    modalRef.then(
     () => {
       console.log('update profil...');
       this.userService.updateUser(this.user).subscribe(data =>{
        this.toastrService.success('Votre modification a été bien effectués');  
      localStorage.setItem('profile',JSON.stringify(data));
      this.refreshProfile();
      this.showSuccess = true; 
          setTimeout( () => {
          this.showSuccess = false;
          this.router.navigate(['/home'])
        }, 1000);
    });
     },
     () => {
       console.log('not update...');
     });
    
    



  }

}

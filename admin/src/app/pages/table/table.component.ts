import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Suppression d'utilisateur
    </h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Etes-vous sûr que vous voulez supprimer</strong></p>
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
declare interface TableData {
    headerRow: string[];
    dataRows: any;
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public tableData1: TableData;
    users : User[];
  constructor(private userService: UserService, private router: Router,private modalService: NgbModal,private toastrService: ToastrService ) { }
    ngOnInit(){
        this.getUsers();

  }
  private getUsers(){
    this.userService.getAllUsers().subscribe(data => { this.users = data;
      console.log(this.users)
    })
  }

  modifier(id){
    this.router.navigate(['update-user', id]);
  }
  /*
  updateUser(id: number){
    this.router.navigate(['update-user', id]);
  }
    */
  deleteRide(id: number) {
    const modalRef = this.modalService.open(NgbdModalConfirm).result; 
   modalRef.then(
    () => { 
    this.userService.deleteUser(id).subscribe((data) => {
      this.toastrService.success("vous avez supprimer avec succsse!")
      this.getUsers();
    });
  },
  () => {
    console.log('not deleting...');
  });
  }
  }

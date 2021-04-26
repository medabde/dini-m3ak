import { Component,  ViewChild,OnInit, Inject  ,Input, TemplateRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RideService } from '../services/ride.service';
import { Ride } from '../models/Ride';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import {  MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Suppression du trajet
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

@Component({
  selector: 'ngbd-modal-confirmujoindr',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">se déconnecter du trajet
    </h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Etes-vous sûr que vous voulez disjoindre</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="no()">Annuler</button>
    <button type="button" class="btn btn-danger" (click)="yes()">Ok</button>
  </div>
  `
})
export class  NgbdModalConfirmunjoin {
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
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})

export class RideComponent implements OnInit {

  trash=faTrash;
  edit=faEdit;
  eye=faEye;
  minus=faMinus;
  rides:Ride[] = [];
  EnabledRidesByUser:Ride[]=[];
  DisabledRidesByUser:Ride[]=[];
  RidesJoinedByUse:Ride[]=[];
  inPageEnabledRidesByUser:Ride[]=[];
  inPageDisabledRidesByUser:Ride[]=[];
  inPageRidesJoinedByUse:Ride[]=[];
  pageDisabledRidesByUser=1;
  pageRidesJoinedByUse=1;
  pageEnabledRidesByUser = 1;
  pageSize = 4;
  collectionSizeEnabledRidesByUser = 0;
  collectionSizeDisabledRidesByUser=0;
  collectionSizeRidesJoinedByUse=0;
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"

  @ViewChild('staticTabs', { static: true }) staticTabs: any;

  toggleDisabledState() {
  this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
 
  

  constructor(private rideService:RideService,private router:Router,private modalService: NgbModal,private toastrService: ToastrService) {
    this.getdata();
    this.refreshEnabledRidesByUser();
  }


  refreshEnabledRidesByUser () {
    this.inPageEnabledRidesByUser = this.EnabledRidesByUser
      .map((ride, i) => ({id: i + 1, ...ride}))
      .slice((this.pageEnabledRidesByUser- 1) * this.pageSize, (this.pageEnabledRidesByUser - 1) * this.pageSize + this.pageSize);
  }
  refreshDisabledRidesByUser () {
    this. inPageDisabledRidesByUser= this.DisabledRidesByUser
      .map((ride, i) => ({id: i + 1, ...ride}))
      .slice((this.pageDisabledRidesByUser- 1) * this.pageSize, (this.pageDisabledRidesByUser- 1) * this.pageSize + this.pageSize);
  }
  refreshRidesJoinedByUse () {
    this.inPageRidesJoinedByUse = this.RidesJoinedByUse
      .map((ride, i) => ({id: i + 1, ...ride}))
      .slice((this.pageRidesJoinedByUse- 1) * this.pageSize, (this.pageRidesJoinedByUse - 1) * this.pageSize + this.pageSize);
  }
  delete(id:any,i:any):void{
    const modalRef = this.modalService.open(NgbdModalConfirm).result; 
   modalRef.then(
    () => {
      console.log('deleting...');
       this.rideService.deleteRide(id).subscribe(res=>{
        this.toastrService.success('Vous avez supprimer ce trajet avec succès!');
      this.rides.splice(i, 1);
      this.getdata();
    });
    },
    () => {
      console.log('not deleting...');
    });
   
     
    
    
  }
 
 unjoin(rideId:any):void{
  const modalRef = this.modalService.open(NgbdModalConfirmunjoin).result; 
  modalRef.then(
   () => {
     console.log('unjoin...');
       this.rideService.unjoinRide(rideId).subscribe(data =>{
        this.toastrService.error('Vous avez disjoindre ce trajet avec succès!');
    this.getdata();
   })
   },
   () => {
     console.log('not unjoin...');
   });
 
 }
 getdata(){
  this.rideService.getAllEnabledRidesByUser().subscribe(data => 
    {this.EnabledRidesByUser = data ;
      this.collectionSizeEnabledRidesByUser=this.EnabledRidesByUser.length;
      this.refreshEnabledRidesByUser();
    });
  this.rideService.getAllDisabledRidesByUser().subscribe(data => 
    {this.DisabledRidesByUser = data ; 
      this.collectionSizeDisabledRidesByUser=this.DisabledRidesByUser.length;
      this.refreshDisabledRidesByUser();
    });
  this.rideService.getAllRidesJoinedByUser().subscribe(data =>
     {this.RidesJoinedByUse = data ; 
    this.collectionSizeRidesJoinedByUse=this.RidesJoinedByUse.length;
    this.refreshRidesJoinedByUse(); 
    
  });
 }
  ngOnInit(): void {
  }

}

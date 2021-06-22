import { Component, OnInit } from "@angular/core";
import { Ride } from "app/models/Ride";
import { RideService } from "app/services/ride.service";
import { ToastrService} from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "rides.component.html",
})
export class RidesComponent implements OnInit {
  rides: Ride[] = [];
  constructor(private rideService: RideService,private toastrService: ToastrService,private modalService: NgbModal) {
    this.setRides();
  }
  setRides() {
    this.rideService.getAllRides().subscribe((data) => {
      this.rides = data;
      console.log(this.rides);
    });
  }
  enableRide(id: number) {
    this.rideService.enableRide(id).subscribe((data) => {
      this.setRides();
    });
  }
  disableRide(id: number) {
    this.rideService.disableRide(id).subscribe((data) => {
      this.setRides();
    });
  }

  deleteRide(id: number) {
    const modalRef = this.modalService.open(NgbdModalConfirm).result; 
   modalRef.then(
    () => {
    this.rideService.deleteRide(id).subscribe((data) => {
      this.toastrService.success("vous avez supprimer ce trajet avec succsse!")
      this.setRides();
    });
    },
    () => {
      console.log('not deleting...');
    });
  }
  ngOnInit() {}
}

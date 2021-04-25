import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {RideService} from 'src/app/services/ride.service';
import {CityService} from 'src/app/services/city.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ride } from '../models/Ride';
import { DatePipe } from '@angular/common'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Modification du trajet
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
  selector: 'app-update-ride',
  templateUrl: './update-ride.component.html',
  styleUrls: ['./update-ride.component.scss']
})
export class UpdateRideComponent implements OnInit {
   ride:Ride=new Ride();
   public destination_city :any[] = [] ;
   public starting_city :any[] =[]
   ride_type :any;
   public myForm : any
   id_city : any;
   datedep:string = "";
   datedest:string ="";

   newDepartureCityId:number=-1;
   newDestinationCityId:number=-1;
   newTypeId:number=-1;
   showSuccess:boolean = false;


   constructor(private rideservice:RideService,public datepipe: DatePipe,private cityService:CityService, private router: Router,private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,private modalService: NgbModal) { 
    this.rideservice.getRidesbyid(this.activatedRoute.snapshot.params.id).subscribe(data => {
      this.ride= data;

      this.newDepartureCityId = this.ride.starting_city.id_city;
      this.newDestinationCityId = this.ride.destination_city.id_city;
      this.newTypeId = this.ride.ride_type.id_type;

      this.getAllTypes();
      this.getAllCities();
      this.datedep = this.datepipe.transform(this.ride.starting_date, 'yyyy-MM-ddTHH:mm:ss')||"";
      this.datedest = this.datepipe.transform(this.ride.destination_date, 'yyyy-MM-ddTHH:mm:ss')||"";
      });
    

  }

  ngOnInit(): void {
  }
updateRide(){
  const modalRef = this.modalService.open(NgbdModalConfirm).result; 
  modalRef.then(
   () => {
     console.log('updating...');
      this.ride.starting_date = new Date(this.datedep);
  this.ride.destination_date = new Date(this.datedest);
  
  console.log(this.newDepartureCityId);
  console.log(this.newDestinationCityId);
  console.log(this.newTypeId);

  this.cityService.getTypeById(this.newTypeId).subscribe(data =>{
    
    this.ride.ride_type = data;
    this.cityService.getCitieById(this.newDepartureCityId).subscribe(data =>{
      this.ride.starting_city = data;
      this.cityService.getCitieById(this.newDestinationCityId).subscribe(data=>{
        this.ride.destination_city = data;
        this.rideservice.updateride(this.ride).subscribe(data =>{
          this.showSuccess = true; 
          setTimeout( () => {
          this.showSuccess = false;
          this.router.navigate(['/ride'])
        }, 1000);});
        
      })
    });
    
  })
   },
   () => {
     console.log('not update...');
   });
 
  
}
getAllTypes(){
  this.cityService.getTypes().subscribe(data => {
    this.ride_type = data;
    console.log(data);
      }, err => {
    console.log(err);
  })
 }
  destcityChange(event : any) {
    this.newDestinationCityId=event.target.value;
  }
  depcityChange(event : any) {
    this.newDepartureCityId=event.target.value;
  }
  typeChange(event : any) {
    this.newTypeId=event.target.value;
  }
 getAllCities(){
  this.cityService.getCities().subscribe((data : any[]) => {
    this.destination_city = data;
    this.starting_city=data;
       if(data.length>0){
         this.myForm = this.formBuilder.group({
           price : ['',Validators.required],
           seats : ['',Validators.required],
           starting_date : ['',Validators.required],
           destination_date: ['', Validators.required],
           destination_city : [this.ride.destination_city.id_city,Validators.required],
           ride_type : [this.ride.ride_type.id_type,Validators.required],
           starting_city : [this.ride.starting_city.id_city,Validators.required]
           })
         
         /*this.destCity=data[0];
         this.startCity=data[0];
         console.log(this.destCity)
         console.log(this.startCity);*/
       }
      }, err => {
    console.log(err);
  })
 }
}

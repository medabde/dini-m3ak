import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {RideService} from 'src/app/services/ride.service';
import {CityService} from 'src/app/services/city.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ride } from '../models/Ride';
import { DatePipe } from '@angular/common'

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
   datedep:string = ""
  datedest:string =""
  selectedType:any;
  selectedStartingCity:any;
  selectedDestinationCity:any;

   constructor(private rideservice:RideService,public datepipe: DatePipe,private cityService:CityService, private router: Router,private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { 
    this.rideservice.getRidesbyid(this.activatedRoute.snapshot.params.id).subscribe(data => {
      this.ride= data;
      this.selectedType = this.ride.ride_type.id_type;
      this.selectedStartingCity = this.ride.starting_city.id_city;
      this.selectedDestinationCity = this.ride.destination_city.id_city;
      console.log(this.selectedStartingCity+"hh")
      this.getAllTypes();
      this.getStartingCities();
      this.getAllCities();
      this.datedep = this.datepipe.transform(this.ride.starting_date, 'yyyy-MM-ddTHH:mm:ss')||"";
      this.datedest = this.datepipe.transform(this.ride.destination_date, 'yyyy-MM-ddTHH:mm:ss')||"";
      });
    

  }

  ngOnInit(): void {
  }
updateRide(){
  this.ride.starting_date = new Date(this.datedep);
  this.ride.destination_date = new Date(this.datedest);
  
  this.cityService.getTypeById(this.selectedType).subscribe(data =>{
    this.ride.ride_type = data;
    this.rideservice.updateride(this.ride).subscribe(data => this.router.navigate(['/ride']));
  })
  
  
  
  
}
getAllTypes(){
  this.cityService.getTypes().subscribe(data => {
    this.ride_type = data;
    console.log(data);
      }, err => {
    console.log(err);
  })
 }
 cityChange(event : any) {
  this.id_city=event.target.value;
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
 getStartingCities(){
  this.cityService.getCities().subscribe(data => {
    this.starting_city = data;
    console.log(data);
      }, err => {
    console.log(err);
  })
}
}

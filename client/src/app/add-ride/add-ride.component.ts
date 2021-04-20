import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RideService} from 'src/app/services/ride.service';
import {CityService} from 'src/app/services/city.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.scss']
})
export class AddRideComponent implements OnInit {
  err: String = 'erreuuuur';
  public destination_date : Date =new Date();
 public price = 0;
 public seats = 0;
 public starting_date : any
 public destination_city :any[] = [] ;
 public ride_type = '';
 public starting_city :any[] =[]
 public motorist = '';
 id_city : any;
 selectedCity:any;

 // @ts-ignore
 public myForm : FormGroup

 public city :any;

 destCity : any;
 startCity : any;


  constructor(private Rideservice:RideService,private router:Router,private formBuilder: FormBuilder, private cityService : CityService) {

  
   }
   ngOnInit(): void {
    this.getAllCities();
    this.getAllTypes();
    this.getStartingCities();
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
            destination_city : [data[0].id_city,Validators.required],
            ride_type : ['',Validators.required],
            starting_city : [data[0].id_city,Validators.required]
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
  cityChange(event : any) {
    this.id_city=event.target.value;
    }
  getStartingCities(){
    this.cityService.getCities().subscribe(data => {
      this.starting_city = data;
      console.log(data);
        }, err => {
      console.log(err);
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
 
   

 
  saveRide():void {
    this.Rideservice.createRide(this.myForm.value['destination_date'],this.myForm.value['price'], this.myForm.value['seats'], this.myForm.value['starting_date'], this.myForm.value['destination_city']
    ,this.myForm.value['ride_type'], this.myForm.value['starting_city'], this.motorist).subscribe(data => {
      console.log(data)
    
    });
    this.myForm.reset();
  }
}
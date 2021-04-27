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

 //message erreur
 validationMessages = {
  'price' : [
    {type : "required",message: "Vous devez saisir un prix"},
    {type : "pattern" , message : "le prix doit avoir seulement des chiffres"}
  ],
  'seats' :[
    {type: "required",message: " Vous devez saisir le nombre de place"},
    {type : "min",message:"Le nombre de place ne doit pas etre inferieur de 1 "},
    {type : "max",message : " le nombre de place ne doit pas depacer 11"}

  ],

  'starting_date':[
    {type: "required", message : " Vous devez choisir la date de depart"}
  ],
  'destination_date':[
    {type: "required", message : " Vous devez choisir la date de destination"}
  ],
  'ride_type':[
    {type: "required", message : " Vous devez choisir le type de votre trajet"}
  ],
  
  'starting_city':[
    {type : "required" , message : " Vous devez choisir une ville de depart"}
  ],
  'destination_city':[
    {type: "required", message : " Vous devez choisir une ville de destination"}
  ]

 }

constructor(private Rideservice:RideService,private router:Router,private formBuilder: FormBuilder, private cityService : CityService) {
  this.myForm = this.formBuilder.group({
    price : ['',Validators.compose([Validators.required,Validators.pattern('^[0-9]+')])],
    seats : ['',Validators.compose([Validators.required,Validators.min(1),Validators.max(10)])],
    starting_date : ['',Validators.required],
    destination_city : ['',Validators.required],
    destination_date: ['', Validators.required],
    ride_type : ['',Validators.required],
    starting_city : ['',Validators.required]
    })
  
  /*this.destCity=data[0];
  this.startCity=data[0];
  console.log(this.destCity)
  console.log(this.startCity);*/


 }
   ngOnInit(): void {
    this.getAllCities();
    this.getAllTypes();
    this.getStartingCities();
  }

 getAllCities(){
    this.cityService.getCities().subscribe(data => {
      this.destination_city = data;
      console.log(data);
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
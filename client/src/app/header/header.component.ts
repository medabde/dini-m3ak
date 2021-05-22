<<<<<<< HEAD
import { Component, OnInit,Output,Pipe, PipeTransform , EventEmitter } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faMinus,faEye,faMap } from '@fortawesome/free-solid-svg-icons';
=======
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  faPlus,
  faMinus,
  faEye,
  faMap,
} from '@fortawesome/free-solid-svg-icons';
>>>>>>> b8ed73525f40b17f6d589cf32adfbee1ae7bc6d5
import decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RideService } from '../services/ride.service';
import { Ride } from '../models/Ride';
import { User } from '../models/User';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CityService} from 'src/app/services/city.service';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //search form
  messageerr:string='';
  starting_city_name=0;
  destination_city=0 ;
  //string = formatDate(new Date(),'dd-MM-yyyy','fr');
  starting_date: Date = new Date()
  nbPassengers=0;
  all_city: any[] = [];
  title = 'appBootstrap';
  join = faPlus;
  unjoin = faMinus;
  viewMore = faEye;
<<<<<<< HEAD
  road=faMap;
  rides:Ride[] = [];
  userId:number = -1;
  ridesInPage:Ride[] = [];
=======
  road = faMap;
  rides: Ride[] = [];

  userId: number = -1;
>>>>>>> b8ed73525f40b17f6d589cf32adfbee1ae7bc6d5

  ridesInPage: Ride[] = [];

  page = 1;
  pageSize = 4;
  collectionSize = 0;

<<<<<<< HEAD

  model :any;
  name :string='';

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [ "assets/image/voiture1.jpg", "assets/image/voiture5.jpg","assets/image/voiture3.jpg"];

  constructor(config: NgbCarouselConfig,private router :Router,private rideService:RideService,private toastrService: ToastrService,private fb: FormBuilder, private cityService: CityService) {
=======
  model: any;
  name: string = '';

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [
    'assets/image/voiture1.jpg',
    'assets/image/voiture5.jpg',
    'assets/image/voiture3.jpg',
  ];

  constructor(
    config: NgbCarouselConfig,
    private router: Router,
    private rideService: RideService,
    private toastrService: ToastrService
  ) {
>>>>>>> b8ed73525f40b17f6d589cf32adfbee1ae7bc6d5
    // customize default values of carousels used by this component tree
    //this.starting_date=dd/MM/yyyy;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;

    if (localStorage.getItem('profile') != null) {
      const decodedToken: any = decode(
        JSON.parse(localStorage.getItem('profile') || '').token
      );
      this.userId = decodedToken.userId;
    }

    rideService.getRides().subscribe(
      (data) => {
        this.rides = data;
        this.collectionSize = this.rides.length;
        this.rides.forEach((r) => {
          r.isUserJoined = this.isUserJoined(r.passengers);
        });
        this.handlePageChange();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  search() {
    console.log(this.rides);
    this.rides = this.rides.filter((ride) => {
      return ride.ride_type.type == 'ponctuel';
    });
    this.handlePageChange();
  }
<<<<<<< HEAD
  getAllCities() {
    this.cityService.getCities().subscribe(data => {
      this.all_city = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  private isUserJoined(passengers:User[]):boolean{
    const decodedToken:any = decode(JSON.parse(localStorage.getItem('profile')|| "").token);
=======

  private isUserJoined(passengers: User[]): boolean {
    const decodedToken: any = decode(
      JSON.parse(localStorage.getItem('profile') || '').token
    );
>>>>>>> b8ed73525f40b17f6d589cf32adfbee1ae7bc6d5
    const userId = decodedToken.userId;

    for (let index = 0; index < passengers.length; index++) {
      if (passengers[index].id_user == userId) {
        return true;
      }
    }

    return false;
  }

<<<<<<< HEAD
search(){
  console.log(this.rides);
  
  console.log(this.starting_date);
  //&& ride.starting_date === this.starting_date
  this.rides=this.rides.filter((ride)=>{

  if(ride.starting_city.id_city == this.starting_city_name && ride.destination_city.id_city==this.destination_city&&ride.starting_date.getTime === this.starting_date.getTime && ride.seats==this.nbPassengers ){
   return true;
  }
  else{
    this.messageerr='aucun résultat ne correspond à votre recherche';

  }
  return false;

    //return ride.starting_city.id_city == this.starting_city_name && ride.destination_city.id_city==this.destination_city&&ride.starting_date.getTime === this.starting_date.getTime && ride.seats==this.nbPassengers ; 
});
  this.handlePageChange();
}
  ngOnInit(): void {
    this.getAllCities();
  }

  joinRide(rideId:any,event:Event):void{
=======
  ngOnInit(): void {}

  joinRide(rideId: any, event: Event): void {
>>>>>>> b8ed73525f40b17f6d589cf32adfbee1ae7bc6d5
    event.preventDefault();
    this.rideService.joinRide(rideId).subscribe((data) => {
      this.toastrService.success('Vous avez joindre ce trajet avec succès!');
      for (let index = 0; index < this.rides.length; index++) {
        if (this.rides[index].id_ride == data.id_ride) {
          this.rides[index] = data;
          this.rides[index].isUserJoined = this.isUserJoined(
            this.rides[index].passengers
          );
        }
      }
      this.handlePageChange();
    });
  }
  unJoinRide(rideId: any, event: Event): void {
    event.preventDefault();
    this.rideService.unjoinRide(rideId).subscribe((data) => {
      this.toastrService.error('Vous avez disjoindre ce trajet');
      for (let index = 0; index < this.rides.length; index++) {
        if (this.rides[index].id_ride == data.id_ride) {
          this.rides[index] = data;
          this.rides[index].isUserJoined = this.isUserJoined(
            this.rides[index].passengers
          );
        }
      }
      this.handlePageChange();
    });
  }

  handlePageChange() {
    this.ridesInPage = this.rides
      .map((ride, i) => ({ id: i + 1, ...ride }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  infoRide(ride_id: any, event: Event) {
    event.preventDefault();
    this.router.navigate(['info/' + ride_id]);
  }

  updateRide(ride_id: any, event: Event) {
    event.preventDefault();
    this.router.navigate(['update/' + ride_id]);
  }
}

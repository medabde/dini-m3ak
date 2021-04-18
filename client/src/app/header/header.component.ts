import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faMinus,faEye } from '@fortawesome/free-solid-svg-icons';
import decode from 'jwt-decode';

import {Router} from '@angular/router';
import { RideService } from '../services/ride.service';
import { Ride } from '../models/Ride';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'appBootstrap';  
  join = faPlus;
  unjoin =  faMinus;
  viewMore = faEye;
  rides:Ride[] = [];

  ridesInPage:Ride[] = [];

  ridesPerPage = 5;


    
  model :any;  
  name :string='';

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [ "assets/image/Carpool.png", "https://www.2iibm-tech.fr/images/site-de-covoiturage-france-3.jpg","assets/image/Carpool.png"];

  constructor(config: NgbCarouselConfig,private router :Router,private rideService:RideService) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;


    rideService.getRides().subscribe(data => {
      this.rides = data;
      this.rides.forEach(r =>{
        r.isUserJoined = this.isUserJoined(r.passengers);
      }) 
      
    },error =>{console.log(error)});

    this.handlePageChange(1);
  }

  private isUserJoined(passengers:User[]):boolean{
    const decodedToken:any = decode(JSON.parse(localStorage.getItem('profile')|| "").token);
    const userId = decodedToken.userId;
    
    for (let index = 0; index < passengers.length; index++) {
        if(passengers[index].id_user == userId) {
            return true;
        }
    }

    return false;
}
 

  ngOnInit(): void {
  }

  joinRide(rideId:any):void{
    this.rideService.joinRide(rideId).subscribe(data =>{
      for (let index = 0; index < this.rides.length; index++) {
        if(this.rides[index].id_ride == data.id_ride) {
          this.rides[index] = data;
          this.rides[index].isUserJoined = this.isUserJoined(this.rides[index].passengers);
        }
      }
    });
  }
  unJoinRide(rideId:any):void{
    this.rideService.unjoinRide(rideId).subscribe(data =>{
      for (let index = 0; index < this.rides.length; index++) {
        if(this.rides[index].id_ride == data.id_ride) {
          this.rides[index] = data;
          this.rides[index].isUserJoined = this.isUserJoined(this.rides[index].passengers);
        }
      }
    });
  }

  handlePageChange(pageNumber:number){
    for(let i=0;i<this.rides.length;i++){
      if(i< this.ridesPerPage * pageNumber && i>= this.ridesPerPage * (pageNumber-1)){
        this.ridesInPage.push(this.rides[i]);
      }
    }
  }

 
}

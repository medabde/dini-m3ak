import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ride } from '../models/Ride';
import { RideService } from '../services/ride.service';
import decode from 'jwt-decode';
import { ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-info-ride',
  templateUrl: './info-ride.component.html',
  styleUrls: ['./info-ride.component.scss']
})
export class InfoRideComponent implements OnInit {
  ride:Ride = new Ride;
  userId:number = 0;

  constructor(private route: ActivatedRoute,private rideService:RideService,private toastrService: ToastrService) {
    rideService.getRidesbyid(parseInt(route.snapshot.paramMap.get('id')||"-1")).subscribe(data =>{ 
      this.ride = data;
      this.ride.isUserJoined = this.isUserJoined();
    });
  }

  ngOnInit(): void {
  }

  private isUserJoined():boolean{
    const decodedToken:any = decode(JSON.parse(localStorage.getItem('profile')|| "").token);
    this.userId = decodedToken.userId;
    
    for (let index = 0; index < this.ride.passengers.length; index++) {
        if(this.ride.passengers[index].id_user == this.userId) {
            return true;
        }
    }

    return false;
  }

  updateRide(event:Event){
    event.preventDefault();
    
  }



  joinRide(event:Event):void{
    event.preventDefault();

    this.rideService.joinRide(this.ride.id_ride||-1).subscribe(data =>{
      this.toastrService.success('Vous avez joindre ce trajet avec succès!');
          this.ride = data;
          this.ride.isUserJoined = this.isUserJoined();
    });
  }

  unJoinRide(event:Event):void{
    event.preventDefault();

    this.rideService.unjoinRide(this.ride.id_ride||-1).subscribe(data =>{
      this.toastrService.error('Vous avez disjoindre ce trajet');
      this.ride = data;
      this.ride.isUserJoined = this.isUserJoined();
    });
  }
  
}

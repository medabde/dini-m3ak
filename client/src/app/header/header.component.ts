import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faMinus,faEye } from '@fortawesome/free-solid-svg-icons';
import decode from 'jwt-decode';
import { ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import { RideService } from '../services/ride.service';
import { Ride } from '../models/Ride';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
 
})
export class HeaderComponent implements OnInit {
  title = 'appBootstrap';  
  join = faPlus;
  unjoin =  faMinus;
  viewMore = faEye;
  rides:Ride[] = [];

  userId:number = -1;

  ridesInPage:Ride[] = [];


  page = 1;
  pageSize = 5;
  collectionSize = 0;


    
  model :any;  
  name :string='';

  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [ "assets/image/Carpool.png", "https://www.2iibm-tech.fr/images/site-de-covoiturage-france-3.jpg","assets/image/Carpool.png"];

  constructor(config: NgbCarouselConfig,private router :Router,private rideService:RideService,private toastrService: ToastrService) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;

    if(localStorage.getItem('profile')!=null){
      const decodedToken:any = decode(JSON.parse(localStorage.getItem('profile')|| "").token);
      this.userId = decodedToken.userId;
    }

    rideService.getRides().subscribe(data => {
      this.rides = data;
      this.collectionSize = this.rides.length;
      this.rides.forEach(r =>{
        r.isUserJoined = this.isUserJoined(r.passengers);
      }) 
      this.handlePageChange();

      
    },error =>{console.log(error)});

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

  joinRide(rideId:any,event:Event):void{
    event.preventDefault();
    this.rideService.joinRide(rideId).subscribe(data =>{
      this.toastrService.success('Vous avez joindre ce trajet avec succès!');
      for (let index = 0; index < this.rides.length; index++) {
        if(this.rides[index].id_ride == data.id_ride) {
         
          this.rides[index] = data;
          this.rides[index].isUserJoined = this.isUserJoined(this.rides[index].passengers);
        }
      }
      this.handlePageChange();
    });
  }
  unJoinRide(rideId:any,event:Event):void{
    event.preventDefault();
    this.rideService.unjoinRide(rideId).subscribe(data =>{
      this.toastrService.error('Vous avez disjoindre ce trajet');
      for (let index = 0; index < this.rides.length; index++) {
        if(this.rides[index].id_ride == data.id_ride) {
          this.rides[index] = data;
          this.rides[index].isUserJoined = this.isUserJoined(this.rides[index].passengers);
        }
      }
      this.handlePageChange();
    });
  }

  handlePageChange(){
    this.ridesInPage = this.rides
      .map((ride, i) => ({id: i + 1, ...ride}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  
    
  }

  infoRide(ride_id:any,event:Event){
    event.preventDefault();
    this.router.navigate(["info/"+ride_id]);
  }

  updateRide(ride_id:any,event:Event){
    event.preventDefault();
    this.router.navigate(["update/"+ride_id]);
  }
 
}

import { Component,  ViewChild,OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RideService } from '../services/ride.service';
import { Ride } from '../models/Ride';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
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

  @ViewChild('staticTabs', { static: true }) staticTabs: any;

  toggleDisabledState() {
  this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
 
  

  constructor(private rideService:RideService,private router:Router) {
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
    
    this.rideService.deleteRide(id).subscribe(res=>{
      this.rides.splice(i, 1);
      this.getdata();
    });
  }

 unjoin(rideId:any):void{
  this.rideService.unjoinRide(rideId).subscribe(data =>{
    this.getdata();
  })
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

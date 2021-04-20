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
  ridesInPage:Ride[] = [];

  @ViewChild('staticTabs', { static: true }) staticTabs: any;

  toggleDisabledState() {
  this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
  page = 1;
  pageSize = 4;
  collectionSize = Ride.length;
  

  constructor(private rideService:RideService,private router:Router) {
     //this.rides = [];
     this.rideService.getAllEnabledRidesByUser().subscribe(data => {this.EnabledRidesByUser = data ; console.log(data)});
     this.rideService.getAllDisabledRidesByUser().subscribe(data => {this.DisabledRidesByUser = data ; console.log(data)});
     this.rideService.getAllRidesJoinedByUser().subscribe(data => {this.RidesJoinedByUse = data ; console.log(data)});

    this.refreshCountries();
  }


  refreshCountries() {
    this.ridesInPage = this.rides
      .map((ride, i) => ({id: i + 1, ...ride}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
  }

}

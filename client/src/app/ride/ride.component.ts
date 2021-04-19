import { Component,  ViewChild,OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RideService } from '../services/ride.service';
import { Ride } from '../models/Ride';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {
  rides:Ride[] = [];

  ridesInPage:Ride[] = [];

  @ViewChild('staticTabs', { static: true }) staticTabs: any;

  toggleDisabledState() {
  this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
  page = 1;
  pageSize = 4;
  collectionSize = Ride.length;
  

  constructor(private rideService:RideService,private router:Router) {
    // this.rides = [];
    // this.rideService.getRidesbyid().subscribe(data => {this.rides = data ; console.log(data)});
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

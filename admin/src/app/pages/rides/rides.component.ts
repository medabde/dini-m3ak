import { Component, OnInit } from "@angular/core";
import { Ride } from "app/models/Ride";
import { RideService } from "app/services/ride.service";

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "rides.component.html",
})
export class RidesComponent implements OnInit {
  rides: Ride[] = [];
  constructor(private rideService: RideService) {
    this.setRides();
  }
  setRides() {
    this.rideService.getAllRides().subscribe((data) => {
      this.rides = data;
      console.log(this.rides);
    });
  }
  enableRide(id: number) {
    this.rideService.enableRide(id).subscribe((data) => {
      this.setRides();
    });
  }
  disableRide(id: number) {
    this.rideService.disableRide(id).subscribe((data) => {
      this.setRides();
    });
  }

  deleteRide(id: number) {
    this.rideService.deleteRide(id).subscribe((data) => {
      this.setRides();
    });
  }
  ngOnInit() {}
}

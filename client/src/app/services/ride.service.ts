import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Ride} from '../models/Ride';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private baseURL = '/app/api/rides/add';

  constructor(private http:HttpClient) {
  }
   
   createRide(destination_date:Date ,price : Number, seats : Number, starting_date : String, 
    destination_city:String,ride_type: String ,starting_city: Date, motorist : String):Observable<any>{
     let data= {
        destination_date : destination_date,
        is_enable : true,
        price : price,
        seats : seats,
        starting_date : starting_date,
        destination_city: destination_city,
        ride_type : ride_type,
        starting_city : starting_city,
        motorist : motorist
    }

    console.log("data in service" , data)

    return this.http.post(`${this.baseURL}`,data,{headers:this.getHeader()});

    }

  getRides():Observable<Ride[]>{
    var rides:Ride[] = [];

    return this.http.get<Ride[]>("/app/api/rides/enabled",{headers:this.getHeader()});
  }

  getRidesbyid(id_ride:number):Observable<Ride>{
    return this.http.get<Ride>("/app/api/rides/"+id_ride,{headers:this.getHeader()});
  }
  
  getAllEnabledRidesByUser():Observable<Ride[]>{
    return this.http.get<Ride[]>("/app/api/rides/enabledRidesByUser",{headers:this.getHeader()});
  }

  getAllDisabledRidesByUser():Observable<Ride[]>{
    return this.http.get<Ride[]>("/app/api/rides/disabledRidesByUser",{headers:this.getHeader()});
  }

  getAllRidesJoinedByUser():Observable<Ride[]>{
    return this.http.get<Ride[]>("/app/api/rides/ridesJoinedByUser",{headers:this.getHeader()});
  }

  deleteRide(_id:any):Observable<Ride>{
    return this.http.delete<Ride>(`/app/api/rides/${_id}`,{headers:this.getHeader()});
  }

  updateride(newRide:Ride):Observable<Ride>{
   
    return this.http.put<Ride>(`/app/api/rides/${newRide.id_ride}`,newRide,{headers:this.getHeader()});
  }
  
  joinRide(id_ride:number):Observable<Ride>{
    
    return this.http.put<Ride>("/app/api/rides/joinride/"+id_ride,{},{headers:this.getHeader()});

  }

  unjoinRide(id_ride:number):Observable<Ride>{
    
    return this.http.put<Ride>("/app/api/rides/unjoinride/"+id_ride,{},{headers:this.getHeader()});

  }

  getHeader():HttpHeaders{
    return new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('profile')||"{}").token
    });
  }
}

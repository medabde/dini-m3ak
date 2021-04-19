import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Ride} from '../models/Ride';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http:HttpClient) {
   }

  getRides():Observable<Ride[]>{
    var rides:Ride[] = [];

    return this.http.get<Ride[]>("/app/api/rides/enabled",{headers:this.getHeader()});
  }
  getRidesbyid(id_ride:number):Observable<Ride[]>{
    var rides:Ride[] = [];

    return this.http.get<Ride[]>("/app/api/rides/"+id_ride,{headers:this.getHeader()});
  }
  deleteList(_id:any):Observable<Ride>{
    return this.http.delete<Ride>(`/app/api/rides/${_id}`,{headers:this.getHeader()});
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

import { Injectable, Type } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/City';
import { RideType } from '../models/RideType';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseURL = '/app/api/cities/';
  private cityURL = 'app/api/types/';
  constructor(private http:HttpClient) {  
  }
  getCities():Observable<any>{
    return this.http.get(`${this.baseURL}`,{headers:this.getHeader()});
  }

  getCitieById(id:number):Observable<City>{
    return this.http.get<City>(`${this.baseURL}/${id}`,{headers:this.getHeader()});
  }

  getTypes():Observable<any>{
    return this.http.get(`${this.cityURL}`,{headers:this.getHeader()});
  }

  getTypeById(id:number):Observable<RideType>{
    return this.http.get<RideType>(`${this.cityURL}/${id}`,{headers:this.getHeader()});
  }

  private getHeader():HttpHeaders{
    return new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('profile')||"{}").token,
      'Access-Control-Allow-Origin':'*',
    });
  }
}

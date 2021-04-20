import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  private header:HttpHeaders;
  private baseURL = '/app/api/cities/';
  private cityURL = 'app/api/types/';
  constructor(private http:HttpClient) { 
    this.header =  new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('profile')||"{}").token,
      'Access-Control-Allow-Origin':'*',
    });
  }
  getCities():Observable<any>{
    return this.http.get(`${this.baseURL}`,{headers:this.header});
  }
  getTypes():Observable<any>{
    return this.http.get(`${this.cityURL}`,{headers:this.header});
  }
}

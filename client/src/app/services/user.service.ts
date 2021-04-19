import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  updateUser(user:User):Observable<User>{
    return this.http.put<User>("app/api/users/",user,{headers:this.getHeader()});
  }

  private getHeader():HttpHeaders{
    return new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('profile')||"{}").token
    });
  }
}

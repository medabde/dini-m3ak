import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  signInClient(email:string,password:string):Observable<any>{ 
    return this.http.post('/app/auth/login',{email,password,role:2});
  }


signUpClient(email:string,password:string,fname:string,lname:string):Observable<any>{
  return this.http.post('/app/auth/register',{fname,lname,email,password,role:2});
}

logOut():void{
  localStorage.clear();
}

}

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
    return this.http.post('/app/auth/login',{email,password,role:1});
  }




logOut():void{
  localStorage.clear();
}

isAcces() {
  if (localStorage.getItem('isAcess') === 'true') {
      return true;
  } else if (localStorage.getItem('isAcess') == 'false') {
      return false;
  } else {
      return false;
  }
}


}

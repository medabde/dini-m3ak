import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getAllUsers():Observable<User[]>{
    var rides:User[] = [];

    return this.http.get<User[]>("app/api/users/",{headers:this.getHeader()});
  }
  getUserById(id_user:number){
    return new Promise((resolve,reject)=>{
      this.http.get("/app/api/users/"+id_user,{headers:this.getHeader()}).subscribe(
        (data:any)=>{
          resolve(data);
        },(error)=>{
            reject(error)
        }
      )
    })
  }

  /*getUserbyid(id_user:number):Observable<User>{
    return this.http.get<User>("/app/api/users/"+id_user,{headers:this.getHeader()});
  }*/

  
  updateuser(id: number , user : User):Observable<User>{
    return this.http.put<User>(`/app/api/users/update/${id}`,user,{headers:this.getHeader()});
  }
  deleteUser(id: any): Observable<User> {
    return this.http.delete<User>(`/app/api/users/${id}`, {
      headers: this.getHeader(),
    });

  }
  updateProfile(user:User):Observable<User>{
    return this.http.put<User>("app/api/users/",user,{headers:this.getHeader()});
  }



  private getHeader():HttpHeaders{
    return new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('profile')||"{}").token
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs'
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:8080/app/users';
  private header:HttpHeaders;
  constructor(private HttpClient : HttpClient) { 
    this.header =  new HttpHeaders();
  }
  getUsersList(): Observable<User[]>{
    return this.HttpClient.get<User[]>('http://localhost:8080/app/users');
}
createUser(user: User): Observable<Object>{
  return this.HttpClient.post(`${this.baseURL}`,user);
}
getUserById(id: number): Observable<User>{
  return this.HttpClient.get<User>(`${this.baseURL}/${id}`); 

}
updateUser(id: number, user: User): Observable<Object>{
  return this.HttpClient.put(`${this.baseURL}/${id}`, user);
}
deleteUser(id: number): Observable<Object>{
  return this.HttpClient.delete(`${this.baseURL}/${id}`);
}
signIn(email:string,password:string):Observable<any>{  
  return this.HttpClient.post(`${this.baseURL}/Signin`,{email,password});            
}
signUp(email:string,password:string,confirmPassword:string,nom:string,prenom:string):Observable<any>{
  return this.HttpClient.post(`${this.baseURL}/Signup`,{email,password,confirmPassword,nom,prenom});
}
logOut():void{
  localStorage.clear();
}
}

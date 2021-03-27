import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users : User[];
  searchValue : string;
  constructor(private userService: UserService, private router: Router) { }
  totalLength: any;
  page : number = 1;

  ngOnInit(): void {
    this.getUsers();
  }
  private getUsers(){
    this.userService.getUsersList().subscribe(data => { this.users = data;
      this.totalLength = data.length
      console.log(this.users)
    });
  }
  updateUser(id: number){
    this.router.navigate(['update-user', id]);

  }
  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe( data => {
      console.log(data);
      this.getUsers();
    })
  }

}

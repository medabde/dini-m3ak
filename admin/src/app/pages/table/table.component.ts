import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

declare interface TableData {
    headerRow: string[];
    dataRows: any;
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    public tableData1: TableData;
    users : User[];
  constructor(private userService: UserService, private router: Router ) { }
    ngOnInit(){
        this.getUsers();
         
  }
  private getUsers(){
    this.userService.getAllUsers().subscribe(data => { this.users = data;
      console.log(this.users)
    })
  }

  modifier(id){
    console.log(id);
    this.router.navigate(['update-user', id]);
  }
  /*
  updateUser(id: number){
    this.router.navigate(['update-user', id]);
  }
    */
  deleteRide(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.getUsers();
    });
  }
  }


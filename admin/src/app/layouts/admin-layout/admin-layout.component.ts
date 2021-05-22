import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router: Router,private auth :AuthService
  ) {
    //if(localStorage.getItem('profile'))this.router.navigate(['home']);

  }


  ngOnInit() { 

    if(!this.auth.isAcces()){
      this.router.navigateByUrl("/login");
    }

  }
}

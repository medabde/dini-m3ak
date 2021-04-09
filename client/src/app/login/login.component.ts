import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validatingForm:any;
  faeye=faEye;
 /**
   * Username Field
   */
  public username = '';

  /**
   * Password Field
   */
  public password = '';

  /**
   * Visibility Boolean
   */
  public isVisible = false;

  /**
   * message Error
   */
  public messageError: string ='';
  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor() { }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }
  }

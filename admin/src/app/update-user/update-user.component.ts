import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgForm, Validators} from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { User } from 'app/models/User';
import { UserService } from 'app/services/user.service';
import { ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  myForm: FormGroup
  msg:any;
  existe=false;
  validationMessages = {
    'first_name': [
      {type: 'required', message: 'Vous devez saisir votre prenom'},
      {type: 'pattern', message: 'le prenom doit avoir seulement des lettres'}
    ],
    'last_name': [
      {type: 'required', message: ' Vous devez saisir votre nom'},
      {type: 'pattern', message: 'le prix doit avoir seulement des lettres'}

    ],

    'cin': [
      {type: 'required', message: ' Vous devez saisir votre cin'}
    ],
    'email': [
      {type: 'required', message: ' Vous devez saisir votre email'}
    ],
    'phone': [
      {type: 'required', message: ' Vous devez saisir votre numero de telephone'}
    ],
    'address': [
      {type: 'required', message: ' Vous devez saisir votre address'}
    ],
  };

  constructor(private userService : UserService   ,private router :Router, private formBuilder: FormBuilder,private activatedRout : ActivatedRoute,private toastrService: ToastrService) { }

  ngOnInit(): void {
   let id = this.activatedRout.snapshot.params['id'];
   this.userService.getUserById(id).then(
     (data :any)=>{
       this.existe=true;
       console.log(data);
      this.myForm = this.formBuilder.group({
        first_name: [data.first_name, Validators.compose([Validators.required, Validators.pattern('^[0-9]+')])],
        last_name: [data.last_name, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+')])],
        cin: [data.cin, Validators.required],
        email: [data.email, Validators.required],
        phone: [data.phone, Validators.required],
        address: [data.address, Validators.required],
      });
     },(error)=>{

    console.log(error)
     }
   )

  }


  //cest quoi le probleme dans cette ligne

  updateUser(){
    /*let user={
      ...this.myForm.value
    }*/

    //ou
    let user =new User();
    user.first_name=this.myForm.value['first_name'];
    user.last_name=this.myForm.value['last_name'];
    user.cin=this.myForm.value['cin'];
    user.email=this.myForm.value['email'];
    user.phone = this.myForm.value['phone'];
    user.address = this.myForm.value['address'];

    console.log(user)

    this.userService.updateuser(this.activatedRout.snapshot.params['id'],user).subscribe(data => {
      console.log(data);
      this.toastrService.success('Profile modifier avec succes');
      this.router.navigate(['/table'])

    });
    }
  }

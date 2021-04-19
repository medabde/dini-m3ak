import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfilComponent} from './profil/profil.component';
<<<<<<< HEAD
import {InfoRideComponent} from './info-ride/info-ride.component';
import { from } from 'rxjs';

=======
import {RideComponent} from './ride/ride.component';
>>>>>>> 121e4ffc677ad662fd39f9e4bf4f4272dc3ac982
const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'home', component: HeaderComponent },
{ path: 'Profil', component: ProfilComponent },
<<<<<<< HEAD
{ path: 'info', component: InfoRideComponent },
=======
{ path: 'ride', component: RideComponent },
>>>>>>> 121e4ffc677ad662fd39f9e4bf4f4272dc3ac982
{ path: '**', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

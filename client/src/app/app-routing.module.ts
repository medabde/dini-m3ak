import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfilComponent} from './profil/profil.component';
import {RideComponent} from './ride/ride.component';
import { InfoRideComponent } from './info-ride/info-ride.component';
import {AddRideComponent} from './add-ride/add-ride.component';
const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'home', component: HeaderComponent },
{ path: 'profile', component: ProfilComponent },
{ path: 'info/:id', component: InfoRideComponent },
{ path : 'add-ride', component: AddRideComponent},
{ path: 'ride', component: RideComponent },
{ path: '**', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

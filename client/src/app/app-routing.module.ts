import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfilComponent} from './profil/profil.component';
import {RideComponent} from './ride/ride.component';
import { InfoRideComponent } from './info-ride/info-ride.component';
import {CreateRideComponent} from './create-ride/create-ride.component';
import {UpdateRideComponent} from './update-ride/update-ride.component';
const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'home', component: HeaderComponent },
{ path: 'profile', component: ProfilComponent },
{ path: 'info/:id', component: InfoRideComponent },
{ path : 'add-ride', component: CreateRideComponent},
{ path : 'update/:id', component: UpdateRideComponent},
{ path: 'ride', component: RideComponent },
{ path: '**', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

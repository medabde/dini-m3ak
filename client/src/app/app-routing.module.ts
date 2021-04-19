import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfilComponent} from './profil/profil.component';
import {InfoRideComponent} from './info-ride/info-ride.component';
import { from } from 'rxjs';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'home', component: HeaderComponent },
{ path: 'Profil', component: ProfilComponent },
{ path: 'info', component: InfoRideComponent },
{ path: '**', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

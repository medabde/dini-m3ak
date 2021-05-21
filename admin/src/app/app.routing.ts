import { Routes } from '@angular/router';
import {LoginComponent} from '../../src/app/login/login.component';
import {UpdateUserComponent} from './update-user/update-user.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {path : 'update-user/:id', component : UpdateUserComponent},
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
const routes: Routes = [
  {path : 'users', component : UserlistComponent},
  {path : 'add-user', component : AddUserComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path : 'update-user/:id', component : UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

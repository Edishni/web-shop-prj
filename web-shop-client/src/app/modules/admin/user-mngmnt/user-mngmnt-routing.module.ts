import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AllUsersComponent } from './all-users/all-users.component';


const routes: Routes = [
  { path: '', redirectTo : 'alluser' , pathMatch:'full'},
  { path: 'adduser', component: AddUserComponent },
  { path: 'edituser/:id', component: EditUserComponent },
  { path: 'alluser', component: AllUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMngmntRoutingModule { }

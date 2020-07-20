import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserMngmntRoutingModule } from './user-mngmnt-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AddUserComponent,
    AllUsersComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    UserMngmntRoutingModule,
    MaterialModule,
    ReactiveFormsModule ,
  ]
})
export class UserMngmntModule { }

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ApiUsersService } from 'src/app/core/services/api-users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  selectedUser: User;
  message ="Be sure to make relevant changes , after edit, please click on 'Save' button.";
  editForm;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private userapi: ApiUsersService, private route: ActivatedRoute,
    private router: Router) { }


  getUserById(id) {
    this.userapi.getById(id)
      .subscribe(
        data => {
          this.selectedUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    const user: User = {
      id: this.selectedUser.id,
      name: this.editForm.controls.name.value,
      email: this.editForm.controls.email.value,
      phone: this.editForm.controls.phone.value,

    }

    this.userapi.editUser(user)
      .subscribe(
        response => {
          console.log(response);
          this.message = `The User ${user.name} was updated successfully!`;
        },
        error => {
          console.log(error);
        });
      }

      goBack(){
        this.router.navigate([`administrator/adminuser/alluser`]);
      }

  ngOnInit(): void {
    this.message = '';
    this.selectedUser = this.userapi.selectedUser;
    this.editForm = this.formBuilder.group({
      name: [this.selectedUser.name, Validators.compose([Validators.required])],
      email: [this.selectedUser.email, Validators.required],
      phone: [this.selectedUser.phone, Validators.required],
    });
  }

}

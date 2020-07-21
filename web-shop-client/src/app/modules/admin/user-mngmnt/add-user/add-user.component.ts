import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiUsersService } from 'src/app/core/services/api-users.service';
import { User } from 'src/app/shared/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
message:string='';
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiUsers: ApiUsersService,
    private router: Router) { }
  addForm;

  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    const user: User = {
      name: this.addForm.controls.name.value,
      email: this.addForm.controls.email.value,
      phone: this.addForm.controls.phone.value,
    }
    this.apiUsers.addUser(user).subscribe(data => {
      
      console.log(data)
    });
    this.message = `The User ${user.name} was updated successfully!`;
    this.addForm.reset();
  }

  goBack() {
    this.router.navigate([`administrator/adminuser/alluser`]);
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.message='';
  }

}

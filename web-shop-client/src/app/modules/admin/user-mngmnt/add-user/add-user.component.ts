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
  message: string = '';
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
//also test if the user exist in DB
    this.apiUsers.getAll()
      .subscribe(
        data => {
          const itNoExsist = data.some(obj => obj.name == user.name || obj.email == user.email || obj.phone == user.phone);
          console.log(itNoExsist);
          if (!itNoExsist) {
            this.apiUsers.addUser(user).subscribe(data => {
              console.log(data);
              this.message = `The User ${user.name} was registred successfully!`;
            });
          }
          else {
            this.message = "The User is exist in our Users List";
          }
        },
        error => {
          this.message = "Sorry, but has some error durring registration..."
          console.log(error);
        });
    console.log(this.message);
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
    this.message = '';
  }

}

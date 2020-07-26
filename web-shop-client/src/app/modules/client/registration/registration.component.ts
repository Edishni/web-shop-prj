import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { ApiUsersService } from 'src/app/core/services/api-users.service';
import { Router } from '@angular/router';
import { ExpressionStatement } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  message: string = "";
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiUsers: ApiUsersService, private router: Router) { }
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
    this.router.navigate([`shopforclient/shopall`]);
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }


}


/* let itExsist: boolean = data.some(obj => {
  console.log(obj);
 (obj.name!= user.name && obj.email != user.email && obj.phone != user.phone);

});
console.log(itExsist);
console.log(user);
if (!itExsist) {
  this.message = "The User is exist in our Users List";
  console.log(this.message);
}
else {
  this.apiUsers.addUser(user).subscribe(data => {
    console.log(data);
    this.message = `The User ${user.name} was registred successfully!`;
  });
} */
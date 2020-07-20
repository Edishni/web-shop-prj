import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { ApiUsersService } from 'src/app/core/services/api-users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiUsers: ApiUsersService) { }
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
    
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }


}

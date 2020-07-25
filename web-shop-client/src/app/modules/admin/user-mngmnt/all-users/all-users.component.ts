import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ApiUsersService } from 'src/app/core/services/api-users.service';
import { Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {  
  selectedUser: User;
  searchname = '';
  message = '';
  dataSource?: User[];

  constructor(public userAPI: ApiUsersService,private formBuilder: FormBuilder,
    private router: Router) {}
 
  loadUsers() {
    this.userAPI.getAll().subscribe(data => this.dataSource = data);
  }

  deleteUser(selUser: User) {
    this.userAPI.deleteUser(selUser.id).subscribe(data => {
      this.loadUsers();
      console.log(data);
    },
      error => {
        console.log(error);
      });

    this.refreshList();
  }

  editUser(selUser: User) {
    this.userAPI.selectedUser = selUser;
    this.router.navigate([`/adminuser/edituser/${selUser.id}`]);
  }

  refreshList() {
    this.loadUsers();
    this.searchname = '';
    this.selectedUser = null;
  }

  searchName(name) {
    console.log(name);
    this.userAPI.getAll()
      .subscribe(
        data => {
          this.dataSource = data.filter(ele => ele.name.includes(name));
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit(): void {
    console.log('users api?');
    this.loadUsers();
  }


}

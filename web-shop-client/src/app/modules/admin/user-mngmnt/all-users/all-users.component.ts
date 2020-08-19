import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { ApiUsersService } from 'src/app/core/services/api-users.service';
import { Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AcceptDialogComponent } from 'src/app/core/components/accept-dialog/accept-dialog.component';

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
  displayedColumns: string[] = ['id', 'name', 'phone', 'email','actions'];
  tableView:boolean=false;
  constructor(public userAPI: ApiUsersService,private formBuilder: FormBuilder,
    private router: Router, private dialog4: MatDialog) {}
 
  loadUsers() {
    this.userAPI.getAll().subscribe(data => this.dataSource = data);
  }

//dialog call start

openDialogForConfirmDeletion(delselUser: User) {
   const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  const dialogRef = this.dialog4.open(AcceptDialogComponent, {
    width: '350px',
    data: "confirm user deletion..."
  });

  dialogRef.afterClosed().subscribe(
    data => {
      console.log("Dialog output:", data);
      //if was confirm delation so delete item
      if (data) {
        this.deleteUser(delselUser);
      }
    }
  );
}

//dialog end

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

  sentMessage(userdata){
    console.log(userdata.email);
  }

  ngOnInit(): void {
    console.log('users api?');
    this.loadUsers();
  }


}

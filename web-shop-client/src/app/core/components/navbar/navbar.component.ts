import { Component, OnInit } from '@angular/core';
import { UserService } from '../../authentication/user.service';
import { CartListService } from '../../services/cart-list.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authentication/authorization.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  opened=false;
  
  constructor(public userAdmin: UserService, private dialog: MatDialog,public cart : CartListService, public router: Router, private auth: AuthorizationService) { }

  logOut() {
    this.auth.doLogout();
    this.router.navigate(['/shopforclient/shopall']);
  }

  logIn() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
    console.log("user:" + this.userAdmin.curentUser)
  }
  
  ngOnInit(): void {
    console.log("Admin?:"+this.userAdmin.Logined);
    console.log("User?:"+this.userAdmin.curentUser);
  }

}

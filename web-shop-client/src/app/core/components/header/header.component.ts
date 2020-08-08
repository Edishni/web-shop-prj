import { Component, OnInit } from '@angular/core';
import { UserService } from '../../authentication/user.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authentication/authorization.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { CartListService } from '../../services/cart-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  constructor(public userAdmin: UserService, public router: Router, private auth: AuthorizationService, private dialog: MatDialog, public cart: CartListService) { }
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
  goToAbout() {
    this.router.navigate(['/about']);
  }
  goToStart() {
    this.userAdmin.Logined ? this.router.navigate([`/administrator/adminprod`]) : this.router.navigate([`/shopforclient/shopall`]);
  }
  goToCart() {
  this.router.navigate([`/shopforclient/orderdetails`]);
  }

  ngOnInit() {
  }

}


import { Component, OnInit } from '@angular/core';
import { UserService } from '../../authentication/user.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authentication/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userAdmin: UserService, public router : Router,private auth:AuthorizationService) { }
logIn(){
  console.log("user:"+this.userAdmin.curentUser)
  this.router.navigate(['login']);
}

logOut(){
  this.auth.doLogout();
  this.router.navigate(['/shopforclient/shopall']);
}
  ngOnInit(): void {
  }

}

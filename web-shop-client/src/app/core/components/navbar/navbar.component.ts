import { Component, OnInit } from '@angular/core';
import { UserService } from '../../authentication/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  opened=false;
  
  constructor(public userAdmin: UserService) { }

  ngOnInit(): void {
    console.log("Admin?:"+this.userAdmin.Logined);
    console.log("User?:"+this.userAdmin.curentUser);
  }

}

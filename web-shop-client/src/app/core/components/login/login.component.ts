import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/core/authentication/authorization.service';
import { Location } from '@angular/common';
import { UserService } from '../../authentication/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm:any;
  errorMessage:string;
  successMessage:string;
  constructor(private auth:AuthorizationService, private router:Router, private location: Location, private userSrv : UserService) { }
  
  loginWithGoogle(){
    this.auth.doGoogleLogin().then(res => {
      this.router.navigate(['/administrator/adminprod']);
    })
  }

  loginWithFacebook(){
    this.auth.doFacebookLogin().then(res => {
      this.router.navigate(['/administrator/adminprod']);
    })
  }

  tryRegister(email,pass){
    this.auth.signInByEmailAndPass(email,pass)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
      this.router.navigate(['/administrator/adminprod']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
      this.router.navigate(['/administrator/adminprod']);
    })
  }
  ngOnInit(): void {

  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/core/authentication/authorization.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/authentication/user.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  myForm: any;
  errorMessage: string;
  successMessage: string;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private auth: AuthorizationService,
    private router: Router, private userSrv: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  tryRegister(email, pass) {
    this.auth.signInByEmailAndPass(email, pass)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        this.dialogRef.close("Welcome administrator...");
        this.router.navigate(['/administrator/adminprod']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
        this.dialogRef.close("Failed Login");
        this.router.navigate(['/shopforclient/shopall']);
      })
  }

  loginWithGoogle() {
    this.auth.doGoogleLogin().then(res => {
      this.router.navigate(['/administrator/adminprod']);
    })
    this.dialogRef.close("Welcome administrator...");
  }

  Cancel() {
    this.dialogRef.close("The Login was canceled");
  }
  
  ngOnInit(): void {
  }

}

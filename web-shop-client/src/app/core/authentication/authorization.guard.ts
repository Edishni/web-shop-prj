import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private auth:AuthorizationService, private router:Router, private userService:UserService){}




  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Promise<any> {
      return new Promise(
        (resolve,reject) => {
          this.userService.getCurrentUser().then(user => {
            console.log("authG"+user.email)
            if(this.userService.adminArr.includes(user.email)){
              return resolve(true);
            }
            else{
              this.userService.Logined=false;
              this.router.navigate(['login']);
              return resolve(false);
            }
          })
        }
      )
    }

}



  


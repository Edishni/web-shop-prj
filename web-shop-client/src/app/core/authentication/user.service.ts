import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';

@Injectable({
  providedIn: 'root'
})
export class UserService {
curentUser:any='QUEST';
 constructor( public db:AngularFirestore,public abAuth:AngularFireAuth) { }
 Logined:boolean=false;
 adminArr= ['edward.tchaevsky@gmail.com','admintest@gmail.com','adminshop@gmail.com']
/*  readonly admin:string = 'edward.tchaevsky@gmail.com';
 readonly admin2:string = 'admintest@gmail.com'; */

  getCurrentUser(){
    return new Promise<any>(
      (resolve,reject) =>{
        const user = firebase.auth().onAuthStateChanged( (user) => {
          console.log(user);
          user? this.curentUser=user.email:this.curentUser='QUEST';
         this.adminLogin(user.email);
          user? resolve(user) : resolve(null);
        })
      }
    )
  }
 
  adminLogin(emailValid): void {
    ( this.adminArr.includes(emailValid)) ? this.Logined= true :this.Logined= false;
  }
  
}

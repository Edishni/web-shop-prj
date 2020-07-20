import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public currentUserName: string = 'quest';
  uestName: string = "test";
  uestPass: string = "test";


  constructor(private afAuth: AngularFireAuth, private userAdmin: UserService) { }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider).then
        (res => {
          this.userAdmin.adminLogin(res.user.email);
          this.userAdmin.curentUser = res.user.email;
          resolve(res);
        },
          err => {
            console.log(err);
            reject(err);
          })
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.signInWithPopup(provider).then(
        res => {
          this.userAdmin.adminLogin(res.user.email);
          this.userAdmin.curentUser = res.user.email;
          resolve(res);
        },
        err => {
          reject(err)
        }
      )
    })
  }

  signInByEmailAndPass(email, pass) {
    return new Promise<any>((resolve, reject) => {

      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(res => {
          this.userAdmin.adminLogin(res.user.email);
          this.userAdmin.curentUser = res.user.email;
          resolve(res);
        }, err => {
          this.doRegister(email, pass);
          reject(err);
        })
    })
  }





  doRegister(email, pass) {
    return new Promise<any>((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(res => {
          this.userAdmin.adminLogin(res.user.email);
          this.userAdmin.curentUser = res.user.email;
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise(
      (resolve, reject) => {
        if (firebase.auth().currentUser) {
          this.afAuth.signOut();
          this.userAdmin.Logined = false;
          this.userAdmin.curentUser = 'QUEST';
          resolve(true);
        }
        else {
          reject('user not found');
        }
      }
    )
  }
}

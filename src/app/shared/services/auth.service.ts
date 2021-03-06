import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { Error } from "../models/error";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  auth: boolean = false;
  public error: Error;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signIn(email, password) {
    this.auth = true;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.auth = false;
          this.router.navigate(['profile']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        this.auth = false;
        this.error = error;
      })
  }

  signUp(email, password) {
    this.auth = true;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        //this.sendVerificationMail();
        this.setUserData(result.user);
        this.auth = false;
        this.router.navigate(['profile']);
      }).catch((error) => {
        this.auth = false;
        this.error = error;
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['profile']);
        })
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}

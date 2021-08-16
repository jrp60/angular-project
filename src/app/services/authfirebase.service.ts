import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { AngularFireAuth } from "@angular/fire/auth";
//import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'platform'
})

export class AuthFirebaseService {
  userData: any; // Save logged in user data

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      console.log("AuthFirebaseService User Constructor",user);
      
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

  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("set uer");
        if(this.SetUserData(result.user)){
          this.ngZone.run(() => {
            console.log("navigate");
            this.router.navigate(['dashboard']);
          });
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  SignInFileWithReload(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          window.location.reload();
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUpFileWithReload(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        window.location.reload();
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }



  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedInAndVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user !==null){
      return true;
    }else{
      return false;
    }
    //return (user !== null) ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    this.AuthLogin(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['dashboard']);
  }

  // Sign in with Google
  GoogleAuthWithReload() {
    return this.AuthLoginWithReload(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    console.log("authlogin");
    
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
          console.log("navigate dashborad");
          
          
        })
      this.SetUserData(result.user);
      window.location.reload();
      console.log("window reload");
      this.router.navigate(['dashboard']);
          console.log("navigate dashborad");
    }).catch((error) => {
      window.alert(error)
    })
  }
  AuthLoginWithReload(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          window.location.reload();
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up userData in private attribute of the class and localStorage */
  SetUserData(user) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    console.log("set user");
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(this.userData));
    return true;
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
      window.location.reload();
      console.log("window reload");
    })
  }

}
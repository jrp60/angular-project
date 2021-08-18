import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from 'firebase/app';

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
      if (user) {
        this.userData = user;
        //to set the Username in 'this.userData'
        if(this.userData.displayname == null){
          let userAux = JSON.parse(localStorage.getItem('user'));
          Object.defineProperty(this.userData, 'displayName', {
            writable: true,
            value: userAux.displayName
          });
        }
        
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  SignIn(email, password, username) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if(this.SetUserData(result.user, username)){
          this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          });
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  SignInFileWithReload(email, password, username) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          window.location.reload();
        });
        this.SetUserData(result.user, username);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password, username) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user, username);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUpFileWithReload(email, password, username) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, username);
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
    //this.router.navigate(['dashboard']);
  }

  // Sign in with Google
  GoogleAuthWithReload() {
    return this.AuthLoginWithReload(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) { 
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
      //window.location.reload();
      //this.router.navigate(['dashboard']);
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
  SetUserData(user, username?) {
    if(username !=null){
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: username,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      this.userData = userData;
    }else{
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      this.userData = userData;
    }
    
    localStorage.setItem('user', JSON.stringify(this.userData));
    return true;
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
      window.location.reload();
    })
  }

}
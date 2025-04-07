import { inject, Injectable, NgZone } from "@angular/core";
// import { User } from "../services/user";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { Auth } from "@angular/fire/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { User as FirebaseUser } from "../services/user";
import { Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "platform",
})
export class AuthFirebaseService {
  userData: any; // Save logged in user data
  // private auth: Auth;
  private auth = inject(Auth);

  constructor(
    private ngZone: NgZone, // NgZone service to remove outside scope warning
    private router: Router
  ) {
    // this.auth = getAuth(); // Get the Firebase Auth instance
    /* Saving user data in localstorage when logged in and setting up null when logged out */
    // onAuthStateChanged(this.auth, (user) => {
    //   if (user) {
    //     this.userData = user;
    //     // Set the username if it's not set
    //     if (this.userData.displayName == null) {
    //       let userAux = JSON.parse(localStorage.getItem("user"));
    //       Object.defineProperty(this.userData, "displayName", {
    //         writable: true,
    //         value: userAux.displayName,
    //       });
    //     }
    //     localStorage.setItem("user", JSON.stringify(this.userData));
    //   } else {
    //     localStorage.setItem("user", null);
    //   }
    // });
    /* Saving user data in localstorage when logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     //to set the Username in 'this.userData'
    //     if (this.userData.displayname == null) {
    //       let userAux = JSON.parse(localStorage.getItem("user"));
    //       Object.defineProperty(this.userData, "displayName", {
    //         writable: true,
    //         value: userAux.displayName,
    //       });
    //     }
    //     localStorage.setItem("user", JSON.stringify(this.userData));
    //   } else {
    //     localStorage.setItem("user", null);
    //   }
    // });
  }

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userData = user;

        if (!user.displayName) {
          const localUser = JSON.parse(localStorage.getItem("user"));
          Object.defineProperty(user, "displayName", {
            writable: true,
            value: localUser?.displayName,
          });
        }

        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    });
  }

  // SignIn with email/password
  SignIn(email: string, password: string, username: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        if (this.SetUserData(result.user, username)) {
          this.ngZone.run(() => {
            this.router.navigate(["dashboard"]);
          });
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // SignIn(email, password, username) {
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       if (this.SetUserData(result.user, username)) {
  //         this.ngZone.run(() => {
  //           this.router.navigate(["dashboard"]);
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }

  // SignInFileWithReload(email, password) {
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         window.location.reload();
  //       });
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }

  // SignUp with email/password
  SignUp(email: string, password: string, username: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, username);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  // SignUp(email, password, username) {
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       /* Call the SendVerificaitonMail() function when new user sign
  //       up and returns promise */
  //       this.SendVerificationMail();
  //       this.SetUserData(result.user, username);
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }

  SignInFileWithReload(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  GoogleAuthWithReload(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  SignUpFileWithReload(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Send email verification DELETE THIS
  SendVerificationMail() {
    const user = this.auth.currentUser; // Get the current user
    if (user) {
      return sendEmailVerification(user).then(() => {
        // Call sendEmailVerification on the user
        this.router.navigate(["verify-email"]);
      });
    } else {
      // Handle the case where there is no user logged in
      console.error("No user logged in for email verification.");
    }
  }
  // Send email verification
  SendVerificationMail2() {
    const user = this.auth.currentUser;
    if (user) {
      return sendEmailVerification(user).then(() => {
        this.router.navigate(["verify-email"]);
      });
    }
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(["verify-email"]);
  //     });
  // }

  // Reset forgotten password
  ForgotPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.auth, passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Reset Forggot password
  // ForgotPassword(passwordResetEmail) {
  //   return this.afAuth
  //     .sendPasswordResetEmail(passwordResetEmail)
  //     .then(() => {
  //       window.alert("Password reset email sent, check your inbox.");
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  // Check if user is logged in and email verified
  get isLoggedInAndVerified(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false;
  }
  // Returns true when user is looged in and email is verified
  // get isLoggedInAndVerified(): boolean {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   return user !== null && user.emailVerified !== false ? true : false;
  // }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  get isLoggedIn2(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      return true;
    } else {
      return false;
    }
    //return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign in with Google
  // GoogleAuth2() {
  //   this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  //   //this.router.navigate(['dashboard']);
  // }

  // Sign in with Google
  // GoogleAuthWithReload() {
  //   return this.AuthLoginWithReload(new firebase.auth.GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  // AuthLogin(provider) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(["dashboard"]);
  //       });
  //       this.SetUserData(result.user);
  //       //window.location.reload();
  //       //this.router.navigate(['dashboard']);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }
  // AuthLoginWithReload(provider) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         window.location.reload();
  //       });
  //       this.SetUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  // Setting user data in localStorage
  SetUserData(user: FirebaseUser, username?: string) {
    const userData: FirebaseUser = {
      uid: user.uid,
      email: user.email,
      displayName: username || user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    this.userData = userData;
    localStorage.setItem("user", JSON.stringify(this.userData));
    return true;
  }
  /* Setting up userData in private attribute of the class and localStorage */
  // SetUserData(user, username?) {
  //   if (username != null) {
  //     const userData: User = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: username,
  //       photoURL: user.photoURL,
  //       emailVerified: user.emailVerified,
  //     };
  //     this.userData = userData;
  //   } else {
  //     const userData: User = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       photoURL: user.photoURL,
  //       emailVerified: user.emailVerified,
  //     };
  //     this.userData = userData;
  //   }

  //   localStorage.setItem("user", JSON.stringify(this.userData));
  //   return true;
  // }

  // Sign out
  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
      window.location.reload();
    });
  }
  // Sign out
  // SignOut() {
  //   return this.afAuth.signOut().then(() => {
  //     localStorage.removeItem("user");
  //     this.router.navigate(["sign-in"]);
  //     window.location.reload();
  //   });
  // }
}

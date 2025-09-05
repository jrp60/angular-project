import { inject, Injectable, NgZone } from "@angular/core";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { User as FirebaseUser } from "../interfaces/user";
import { Auth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthFirebaseService {
  userData: any;
  private auth = inject(Auth);

  constructor(
    private ngZone: NgZone, // NgZone service to remove outside scope warning
    private router: Router
  ) {}

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

  SignInFileWithReload(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  GoogleAuthWithReload2(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider, browserPopupRedirectResolver);
  }

  GoogleAuthWithReload(): Promise<any> {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(this.auth, provider, browserPopupRedirectResolver)
      .then((result) => {
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Google login failed:", error);
        window.alert(error.message);
      });
  }

  SignUpFileWithReload(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  SendVerificationMail() {
    const user = this.auth.currentUser;
    if (user) {
      return sendEmailVerification(user).then(() => {
        this.router.navigate(["verify-email"]);
      });
    } else {
      console.error("No user logged in for email verification.");
    }
  }

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

  // Check if user is logged in and email verified
  get isLoggedInAndVerified(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false;
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  // Sign in with Google
  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider, browserPopupRedirectResolver)
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
  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
      window.location.reload();
    });
  }
}

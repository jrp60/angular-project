import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthFirebaseService } from "../services/authfirebase.service";

@Injectable({
  providedIn: "root",
})
export class LoginFirebaseGuard {
  constructor(public authService: AuthFirebaseService, public router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/dashboard"]);
      return false;
    }
    return true;
  }
}

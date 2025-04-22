import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthFirebaseService } from "../services/authfirebase.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthFirebaseGuard {
  constructor(public authService: AuthFirebaseService, public router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isLoggedIn
      ? true
      : this.router.navigate(["sign-in"]);
  }
}

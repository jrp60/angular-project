import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthFirebaseService } from "../services/authfirebase.service";

@Injectable({
  providedIn: "root",
})
export class LoginFirebaseGuard {
  constructor(public authService: AuthFirebaseService, public router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn
      ? true
      : this.router.navigate(["/dashboard"]);
  }
}

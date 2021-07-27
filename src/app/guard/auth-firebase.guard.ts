import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthFirebaseService } from "../services/authfirebase.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthFirebaseGuard implements CanActivate {
  
  constructor(
    public authService: AuthFirebaseService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
      console.log("navigate to signin");
      
      this.router.navigate(['sign-in'])
    }
    return true;
  }

}
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn !== true) {
      this.router.navigate(['sign-in'])
    }
    return true;
  }

  

}
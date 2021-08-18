import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthFirebaseService } from "../services/authfirebase.service";

@Injectable({
  providedIn: 'root'
})
export class LoginFirebaseGuard implements CanActivate {

  constructor(
    public authService: AuthFirebaseService,
    public router: Router
  ){ }

  canActivate() : Observable<boolean> | Promise<boolean> | boolean{
    if(this.authService.isLoggedIn === true){
      this.router.navigate(['/dashboard']);
    }
    return true;
  }
  
}

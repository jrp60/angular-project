import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template:
  `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button class="btn btn-outline-danger  w-100" (click)="auth.logout({ returnTo: document.location.origin })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button class="btn btn-outline-primary  w-100" (click)="loginWithRedirect()">Login con Auth0</button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent{
  // Inject the authentication service into your component through the constructor
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {
    console.log("auth constructor log");
    
    console.log(auth);
    
  }

  loginWithRedirect(): void {
    console.log("MTODO MIO");
    
    this.auth.loginWithRedirect({ redirect_uri: 'http://localhost:4200/perfil/',appState: { target: '/perfil' } });
  }

}

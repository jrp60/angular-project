import { Component, Inject } from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-auth-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./auth-button.component.html",
  styles: [],
})
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/perfil/`,
      },
      appState: { target: "/perfil" },
    });
  }
}
